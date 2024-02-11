// Importing necessary modules
const express = require('express');
const router = express.Router({ mergeParams: true }); // Creating a router with merged parameters
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware'); // Importing middleware functions
const Campground = require('../models/campground'); // Importing Campground model
const Review = require('../models/review'); // Importing Review model
const reviews = require('../controllers/reviews'); // Importing review controller methods
const ExpressError = require('../utils/ExpressError'); // Importing utility function for handling errors
const catchAsync = require('../utils/catchAsync'); // Importing utility function for error handling

// Route for creating a new review
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

// Route for deleting a review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router; // Exporting the router
