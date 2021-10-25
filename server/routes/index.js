let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET Home page. */
router.get('/', indexController.displayHomePage);

/* GET Home page. */
router.get('/home', indexController.displayHomePage);

/* GET About page. */
router.get('/about', indexController.displayAboutPage);

/* GET Projects page. */
router.get('/projects', indexController.displayProductsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact page. */
router.get('/contact', indexController.displayContactPage);

// GET route for the Login page
router.get('/login', indexController.displayLoginPage);

// POST route for processing Login page 
router.post('/login', indexController.processLoginPage);

// GET route for the Register page
router.get('/register', indexController.displayRegisterPage);

// POST route for processing Register page 
router.post('/register', indexController.processRegisterPage);

// GET to perform user Logout
router.get('/logout', indexController.logoutPage);

module.exports = router;
