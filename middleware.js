const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } =  require("./schema.js");


module.exports.isLoggedIn = (req,res,next) =>{
    // console.log(req);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


module.exports.isOwner = async(req,res,next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!res.locals.curUser._id.equals(listing.owner._id)){
        req.flash("error","you are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.ValidateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(404,errMsg);
    }else{
        next();
    }
}

module.exports.ValidateReview = (req,res,next) =>{
     if (!req.body.review) {
        req.flash('error', 'Review data is missing');
        return res.redirect('back');
    }
    let {error} = reviewSchema.validate(req.body.review);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        console.log(errMsg);
        throw new ExpressError(404,errMsg);
    }else{
        next();
    }
}

