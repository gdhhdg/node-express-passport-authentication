//imports
const express  = require('express');
const app      = express();
const port     = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');
const createError = require('http-errors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const path = require('path');

// configuration ===============================================================
const configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// app use mw 
app.use(morgan('dev')); // 
app.use(cookieParser()); // cookies for auth
app.use(bodyParser()); // 
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//  passport
app.use(session({ secret: 'thisisasessionsecretcodepleasechange' })); // Set your Session Secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); //  connect-flash - flash messages in session

// routes ======================================================================
app.use('/', indexRouter);
app.use('/users', usersRouter);//meh...used a template to set up. didn't delete this route

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
