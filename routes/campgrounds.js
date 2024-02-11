// Importing necessary modules
const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds'); // Importing campground controller methods
const catchAsync = require('../utils/catchAsync'); // Importing utility function for error handling
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware'); // Importing middleware functions
const multer = require('multer'); // Importing multer for file uploads
const { storage } = require('../cloudinary'); // Importing cloudinary storage
const upload = multer({ storage }); // Configuring multer for storage

const Campground = require('../models/campground'); // Importing Campground model

// Routes for campgrounds
router.route('/')
    .get(catchAsync(campgrounds.index)) // Route for displaying all campgrounds
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground)); // Route for creating a new campground

// Route for displaying the form to create a new campground
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground)) // Route for displaying a specific campground
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground)) // Route for updating a campground
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground)); // Route for deleting a campground

// Route for displaying the form to edit a campground
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router; // Exporting the router
