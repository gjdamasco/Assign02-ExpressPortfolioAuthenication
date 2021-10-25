// A2 - created for contact model to route

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

/*
// connect to the Contact Model
let Contact = require('../models/contact');
*/

// function for guarding route process
function requireAuth(req, res, next) 
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


let contactController = require('../controllers/contact');

// GET route for the contact list page - READ Operation 
router.get('/', requireAuth, contactController.displayContactList); 


// GET route for the ADD contact page - CREATE Operation 
router.get('/add', requireAuth, contactController.displayAddPage);

// POST route for processing ADD contact page - CREATE Operation 
router.post('/add', requireAuth, contactController.processAddPage);

// GET route for the EDIT contact page - UPDATE Operation 
router.get('/edit/:id', requireAuth, contactController.editPage);

// POST route for the EDIT contact page - UPDATE Operation 
router.post('/edit/:id', requireAuth, contactController.processEditPage);

// GET to perform Deletion - DELETE Operation 
router.get('/delete/:id', requireAuth, contactController.deletePage);

module.exports = router;