const createError = require("http-errors");
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const nodemailer = require("nodemailer");
const MongoClient = "mongodb".MongoClient;
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const url = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("./config/keys");
const { check } = require("express-validator/check");
const Schema = mongoose.Schema;
const cors = require("cors");

const {token, botToken } = require("./config/config");
const request = require("request");

const app = express();

const User = require("./models/users");
const validateRegisterInput = require("./validation/register");
const validateLoginInput = require("./validation/login");

// Passport middleware
app.use(passport.initialize());

//cors
app.use(cors());

// Passport Config
require("./config/passport")(passport);

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

// Get homepage
app.get("/", function(req, res) {
  res.sendFile("/views/landing.html", { root: __dirname });
});

//Get registeration page
app.get("/register", (req, res) => {
  res.sendFile("/views/register.html", { root: __dirname });
});

//Get login page
app.get("/login", (req, res) => {
  res.sendFile("/views/login.html", { root: __dirname });
});

// Connect to MonogoDB
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log("MonogoDB Connected"))
  .catch(err => console.log(err));

//Register
app.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;

  User.findOne({ username }).then(user => {
    if (user) {
      errors.username = "username exists";
      return res.status(400).json({ errors });
    }

    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.sendFile("/views/login.html", { root: __dirname }, console.log(user)))
          .catch(err => res.json(err));
      });
    });
  });
});

//Login
app.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then(user => {
    if (!user) {
      errors.username = "User not found";
      return res.status(404).json(errors);
    }
    if (!(user.role == "board" || user.role == "advisor")) {
      errors.noaccess = "You do not access to this page";
      return res.status(400).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, username: user.username };

        jwt.sign(payload, keys.secretOrkey, { expiresIn: 3600 }, (err, token) => {
          res.sendFile("/views/admin.html", { root: __dirname }).json({ success: true, token: "Bearer " + token });
        });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

app.post("/setrole", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;
  const userchange = req.body.userchange;
  const rolechange = req.body.role;

  User.findOne({ username }).then(user => {
    if (!user) {
      errors.username = "User not found";
      return res.status(404).json(errors);
    }
    if (!(user.role != "board" || user.role != "advisor")) {
      errors.noaccess = "You do not access to this page";
      return res.status(400).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        User.findOneAndUpdate({ username: userchange }, { $set: { role: rolechange } }, { new: true }).then(user => {
          console.log(`role of ${userchange} changed to ${rolechange}`);
          // res.redirect("/login");
          res.json(user);
        });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

app.options('/api/announcements', cors())
app.get("/api/announcements", (_req, _res)=>{
  var log = [];
  var history = {};

  var options = {
    url: "https://slack.com/api/groups.history",
    qs: {
      token: token,
      channel: "GH7J5C9FD"
    }
  };

  request(options, (err, res, body) => {
    if (err) console.log(err);
    var messages = JSON.parse(body).messages;
    messages.forEach(element => {
      if (element.type == "message") {
        log.unshift({
          text: element.text,
          ts: element.ts
        });
      }
    });
    history = {
      status: 200,
      log: log
    };
    console.log(`returned ${history}`);
    return _res.status(200).json(history);
  });
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
