// Importing necessary modules and models
const User = require('../models/user');

// Controller method to render the registration form
module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

// Controller method to handle user registration
module.exports.register = async (req, res, next) => {
    try {
        // Extracting email, username, and password from request body
        const { email, username, password } = req.body;
        
        // Creating a new user instance with email and username
        const user = new User({ email, username });
        
        // Registering the user using the passport-local-mongoose plugin
        const registeredUser = await User.register(user, password);
        
        // Logging in the registered user
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        // Handling registration errors
        req.flash('error', e.message);
        res.redirect('register');
    }
}

// Controller method to render the login form
module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

// Controller method to handle user login
module.exports.login = (req, res) => {
    // Flash message welcoming back the user
    req.flash('success', 'Welcome back!');
    
    // Redirecting the user to the previous page they were on or to the campgrounds page
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

// Controller method to handle user logout
module.exports.logout = (req, res) => {
    // Logging out the user
    req.logout();
    
    // Flash message saying goodbye
    req.flash('success', "Goodbye!");
    
    // Redirecting the user to the campgrounds page
    res.redirect('/campgrounds');
}
