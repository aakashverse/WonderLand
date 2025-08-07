const Listing = require("../models/listing");
const Review = require("../models/review");


// module.exports.createReview = async(req,res)=>{
//     const { review: { rating, comment } } = req.body; 
//     console.log(req.body);
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);
//     newReview.author = req.user._id;

//     listing.reviews.push(newReview);
    
//     await newReview.save();
//     await listing.save();
//     req.flash("success","New Review Created!");
//     res.redirect(`/listings/${listing._id}`);
// }

module.exports.createReview = async(req, res) => {
    console.log(req.body.review);
    const {rating, comment} = req.body.review; // Access nested review object
    const listing = await Listing.findById(req.params.id);
    
    const newReview = new Review({
        comment,
        rating,
        author: req.user._id
    });

    listing.reviews.push(newReview);
    
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview = async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findById(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}