// A2 - controllers for setting up the contact router
let express = require('express');
let router = express.Router();

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', page: 'home'});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About Me', page: 'about'});
}

module.exports.displayProductsPage = (req, res, next) => {
    res.render('index', { title: 'My Projects', page: 'projects'});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services Page', page: 'services'});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', { title: 'Contact Page', page: 'contact'});
}