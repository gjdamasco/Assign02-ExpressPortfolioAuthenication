let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// A2 - modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// A-2 database setup
let mongoose = require('mongoose');
let DB = require('./db');

// A-2 point mongoose to DB URI
mongoose.connect(DB.URI);

// A-2 create an event to connect to dbase 
let mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(console, 'Connection Error: ')) // A2 - an event for db error
mongoDB.once('open', ()=>{                                            // A2 - an event for online connection
  console.log('Connected to MongoDB...');
})  


let indexRouter = require('../routes/index');  //update indexRoute path
let usersRouter = require('../routes/users');  //update usersRoute path

// A2 - for contacts router integration
let contactsRouter = require('../routes/contact');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');   // ejs -e

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));        // A2 - update public folder path

// static path to join all node_modules folders inside the index.ejs
app.use(express.static(path.join(__dirname, '../../node_modules')));  // A2 - update public folder path


// A2 - setup for express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// A2 - initialize flash
app.use(flash());

// A2 - initialize passport
app.use(passport.initialize());
app.use(passport.session());

// A2 - passport user configuration
// A2 create user model instance
let userModel = require('../models/user');
let User = userModel.User;

// implement User Auth Strategy
passport.use(User.createStrategy());

// A2 - serialize and deserialize the user information
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/', indexRouter);
app.use('/users', usersRouter);

// A2 - for app use of contactsRouter
app.use('/contact-list', contactsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
