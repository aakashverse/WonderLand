const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require("../utils/ExpressError")
const {listingSchema, reviewSchema} = require("../schema")
const Review = require('../models/review');
const {isLoggedIn, isOwner, ValidateListing} = require('../middleware.js')
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });
 
// index route + create route
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, ValidateListing, upload.single("listing[image]"), wrapAsync(listingController.createListing));

// create new routecl
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

// show route + update route + delete route
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner, upload.single("listing[image]"), ValidateListing, wrapAsync(listingController.UpdateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.EditListing));

module.exports = router;
