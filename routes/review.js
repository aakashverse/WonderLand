const express = require('express');
const router = express.Router({ mergeParams: true });;
const Listing = require('../models/listing');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require("../utils/ExpressError")
const {reviewSchema} = require("../schema")
const Review = require('../models/review');
const {isLoggedIn, ValidateReview} = require('../middleware.js');
const reviewController = require("../controllers/reviews.js");


// Reviews
// post Review route
router.post("/", isLoggedIn, ValidateReview, wrapAsync(reviewController.createReview));

// Delete Review Route
router.delete("/:reviewId", isLoggedIn, wrapAsync(reviewController.destroyReview));

module.exports = router;