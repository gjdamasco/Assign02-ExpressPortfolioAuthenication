// A2 - controllers for setting up the contact router
let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let passport = require('passport');

// define the user model
let userModel = require('../models/user');
let User = userModel.User;


module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', page: 'home', displayName: req.user ? req.user.displayName: ''});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About Me', page: 'about', displayName: req.user ? req.user.displayName: ''});
}

module.exports.displayProductsPage = (req, res, next) => {
    res.render('index', { title: 'My Projects', page: 'projects', displayName: req.user ? req.user.displayName: ''});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services Page', page: 'services', displayName: req.user ? req.user.displayName: ''});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', { title: 'Contact Page', page: 'contact', displayName: req.user ? req.user.displayName: ''});
}

// user login page
module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages:req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName: ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        // if server error
        if(err)
        {
            return next(err);
        }

        // if user login error
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error
            if(err)
            {
                return next(err);
            }
            return res.redirect('/contact-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else{
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // define user object
    let newUser = new User({
        "displayName": req.body.displayName,
        "email": req.body.email,
        "username": req.body.username
        //password: req.body.password
    });
    
    User.register(newUser, req.body.password, (err) =>{
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exist!'
                );
                console.log('Error: User Already Exist!')
            }
            return res.render('auth/register', 
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            // if no error, user will register
            // redirect and authenticate the user
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contact-list')
            });
        }
    });
}

module.exports.logoutPage = (req, res, next) => {
        req.logout();
        res.redirect('/');
}
