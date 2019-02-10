const createError = require("http-errors");
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var nodemailer = require("nodemailer");
var accountEmail = "";
var accountPassowrd = "";
const app = express();

//View engine setup
app.set("views", path.join(__dirname, "views"));
app.engine(
  "handlebars",
  exphbs({
    extname: "handlebars"
  })
);
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.get("/", function(req, res) {
  res.sendFile("/views/landing.html", { root: __dirname });
});

app.get("/admin", function(req, res) {
  res.sendFile("/views/admin.html", { root: __dirname });
});

app.post("/contact", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: accountEmail,
      pass: accountPassowrd
    }
  });

  const mailOptions = {
    from: req.body.email,
    to: accountEmail,
    subject: req.body.subject,
    html:
      "<h3>New Email from: " +
      req.body.email +
      "</h3> <h3>Subject: " +
      req.body.subject +
      "</h3> Message:  <br />" +
      req.body.message
  };

  transporter.sendMail(mailOptions, (err, req, res) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log("mail sent");
      res.sendStatus(200);
      req.body.name = "";
      req.body.email = "";
      req.body.subject = "";
      req.body.message = "";
    }
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
