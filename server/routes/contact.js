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
            res.render('contact/contact-list', {title: 'Contact List', ContactList: contactList});  // render for the Contact list object 
        }
    });
}); 


// GET route for the ADD contact page - CREATE Operation 
router.get('/add',(req, res, next) => {
    res.render('contact/add', {title: 'Add Contact'});
});

// POST route for processing ADD contact page - CREATE Operation 
router.post('/add',(req, res, next) => {
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
});

// GET route for the EDIT contact page - UPDATE Operation 
router.get('/edit/:id',(req, res, next) => {
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
});

// POST route for the EDIT contact page - UPDATE Operation 
router.post('/edit/:id',(req, res, next) => {
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
});

// GET to perform Deletion - DELETE Operation 
router.get('/delete/:id',(req, res, next) => {
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
});


module.exports = router;