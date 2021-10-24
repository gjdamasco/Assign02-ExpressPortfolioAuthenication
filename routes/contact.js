// created for contact model to route

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to the Contact Model
let Contact = require('../models/contact');

// GET route for the contact list page - READ Operation 
router.get('/', (req, res, next) => {
    Contact.find((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {            
            res.render('contact', {title: 'Contact List', ContactList: contactList})  // render for the Contact list object 
        }
    });
}); 

module.exports = router;