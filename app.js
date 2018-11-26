const createError = require('http-errors');
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var popupTools = require('popup-tools');
var mongoose = require('mongoose');
const app = express();

//auth
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//mongoose
mongoose.connect('mongodb://Ramial:Dell2314!@cluster0-shard-00-00-tfwgd.gcp.mongodb.net:27017,cluster0-shard-00-01-tfwgd.gcp.mongodb.net:27017,cluster0-shard-00-02-tfwgd.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true');


//routes
var mongotest = require('./routes/mongotest');
var landing = require('./routes/landing');
// var registerRouter = require('./routes/register');
// var loginRouter = require ('./routes/login');
var contactRouter = require('./routes/contact');


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
app.use('/landing', landing);
//app.use('/register', registerRouter);
//app.use('/login', loginRouter);
app.use('/contact', contactRouter);

app.get('/', function (req, res) {
    res.render('home', {title: 'Montclair Hackathon'});
});


app.get('/preregister', function(req, res, next){
	res.redirect('https://hawkhack.typeform.com/to/AmjCXs');
});

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