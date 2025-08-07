if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// Database connection
// const Mongourl = 'mongodb://127.0.0.1:27017/wonderland';
const dbUrl = process.env.ATLAS_URL;
mongoose.connect(dbUrl)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Express setup
const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto:{
    secret: process.env.SECRET,
  },
  touchAfter: 24*3600,
});

store.on("error",()=>{
  console.log("ERROR in MONGO SESSION STORE",err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
  },
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());      // to gather user info in particular session
passport.deserializeUser(User.deserializeUser());  // to remove user info in particular session

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curUser = req.user;
  next();
});

// Basic test route - MUST WORK FIRST
// app.get('/', (req, res) => {
//   res.send('Hi, I am root!');
// });

// 404 handler
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

app.get("/demouser",async(req,res)=>{
  let fakeUser = new User({
    email: "akash@gmail.com",
    username: "aakashTheOG",
  });
  
  let registeredUser = await User.register(fakeUser,"iamakashOG");
  res.send(registeredUser);
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// Error handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = 'Something went wrong!' } = err;
  res.status(statusCode).render("error.ejs", {err});
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});