const createError = require("http-errors");
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const app = express();

//routes
// var landing = require("./routes/landing");
// var contactRouter = require("./routes/contact");

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

// app.use("/landing", landing);
// app.use("/contact", contactRouter);

app.get("/", function(req, res) {
  res.sendFile("/views/landing.html", { root: __dirname });
});

app.get("/test", (req, res) => {
  res.sendFile(__dirname + "/views/testing.html");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
