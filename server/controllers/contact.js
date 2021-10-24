// A2 - created for contact controller

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// reference to the contact model
let Contact = require('../models/contact');

module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {       
            res.render('contact/contact-list', {title: 'Business Contact List', ContactList: contactList});  // render for the Contact list object 
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('contact/add', {title: 'Add Contact'});
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = Contact({
        "contactName": req.body.contactName,
        "contactNumber": req.body.contactNumber,
        "emailAdd": req.body.emailAdd
    });

    Contact.create(newContact, (err, Contact) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the Contact list
            res.redirect('/contact-list');
        }
    });
}

module.exports.editPage = (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // show the edit view
            res.render('contact/edit', {title: ' Edit Contact', contact: contactToEdit});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedContact = Contact({
        "_id": id,
        "contactName": req.body.contactName,
        "contactNumber": req.body.contactNumber,
        "emailAdd": req.body.emailAdd
    });

    Contact.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list
            res.redirect('/contact-list');
        }
    });
}

module.exports.deletePage = (req, res, next) => {
    let id = req.params.id;

    Contact.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list
            res.redirect('/contact-list');
        }
    });
}