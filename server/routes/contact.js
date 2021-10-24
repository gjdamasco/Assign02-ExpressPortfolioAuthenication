// A2 - created for contact model to route

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to the Contact Model
let Contact = require('../models/contact');

let contactController = require('../controllers/contact');

// GET route for the contact list page - READ Operation 
router.get('/', contactController.displayContactList); 


// GET route for the ADD contact page - CREATE Operation 
router.get('/add', contactController.displayAddPage);

// POST route for processing ADD contact page - CREATE Operation 
router.post('/add', contactController.processAddPage);

// GET route for the EDIT contact page - UPDATE Operation 
router.get('/edit/:id', contactController.editPage);

// POST route for the EDIT contact page - UPDATE Operation 
router.post('/edit/:id', contactController.processEditPage);

// GET to perform Deletion - DELETE Operation 
router.get('/delete/:id', contactController.deletePage);

module.exports = router;