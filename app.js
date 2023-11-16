require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const serversRouter = require("./routes/servers");
const userRouter = require('./routes/user');

var app = express();
// connect to mongodb
const username = encodeURIComponent(process.env.USER_NAME);
const password = encodeURIComponent(process.env.PASSWORD);
const cluster = encodeURIComponent(process.env.CLUSTER);

let uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connection to MongoDB successful!"))
  .catch(() => console.log("Connection to MongoDB failed!"));

// fix cors error
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/servers", serversRouter);
app.use('/auth', userRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
