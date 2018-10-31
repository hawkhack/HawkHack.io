const createError = require('http-errors');
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var popupTools = require('popup-tools');
const app = express();

//auth
var session = require('express-session');


//routes
var mongotest = require('./routes/mongotest');
var registerRouter = require('./routes/register');
var loginRouter = require ('./routes/login');


//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    extname : 'handlebars',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 's9uZ4tDkXRu0BDB0W6p0bKnxs3aH0jcy',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}))

app.use('/mongotest', mongotest);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.get('/', function (req, res) {
    res.render('home', {title: 'Montclair Hackathon'});
});

/*
app.get('/login', function(req, res){
    res.render('login');
})

app.get('/register', function(req, res){
    res.render('register');
})

*/
app.get('/admin', function (req, res){
    res.render('admin');
})

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