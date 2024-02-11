// Importing necessary modules and models
const Campground = require('../models/campground');
const Review = require('../models/review');

// Controller method to create a new review for a campground
module.exports.createReview = async (req, res) => {
    // Finding the campground by ID
    const campground = await Campground.findById(req.params.id);
    
    // Creating a new review with data from the request body
    const review = new Review(req.body.review);
    review.author = req.user._id; // Assigning the current user as the author of the review
    
    // Pushing the new review into the campground's reviews array
    campground.reviews.push(review);
    
    // Saving the review and the campground
    await review.save();
    await campground.save();
    
    // Flash message indicating successful creation of the review
    req.flash('success', 'Created new review!');
    res.redirect(`/campgrounds/${campground._id}`);
}

// Controller method to delete a review for a campground
module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    
    // Finding the campground by ID and removing the specified review ID from its reviews array
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    
    // Finding and deleting the review by its ID
    await Review.findByIdAndDelete(reviewId);
    
    // Flash message indicating successful deletion of the review
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/campgrounds/${id}`);
}
