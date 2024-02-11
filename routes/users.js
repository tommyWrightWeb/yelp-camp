// Importing necessary modules
const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync'); // Importing utility function for error handling
const User = require('../models/user'); // Importing User model
const users = require('../controllers/users'); // Importing user controller methods

// Routes for user registration
router.route('/register')
    .get(users.renderRegister) // Route for rendering registration form
    .post(catchAsync(users.register)); // Route for handling user registration

// Routes for user login
router.route('/login')
    .get(users.renderLogin) // Route for rendering login form
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login); // Route for handling user login

// Route for user logout
router.get('/logout', users.logout);

module.exports = router; // Exporting the router
