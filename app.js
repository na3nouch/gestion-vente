var createError = require('http-errors');
const express = require('express');
const cors = require("cors");
var path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const expressSession = require("express-session");
const logger = require('morgan');

var app = express();

app.use(cors("*"));

// sessions
app.use(expressSession({
  secret: '343ji43j4n3jn4jk3n',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 24 * 1000,
  }
}));

// set globall variables
app.use(async (req, res, next) => {
  if (req.session && req.session.userInfo) {
    res.locals.userInfo = req.session.userInfo;
  }
  if (req.session && req.session.avatar) {
    res.locals.avatar = req.session.avatar;
  }
  await next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routing
app.use('/', require('./routes/home.routes'));
app.use('/auth', require('./routes/auth.routes'));

app.use('/ventes', require('./routes/vente.routes'));
app.use('/clients', require('./routes/client.routes'));
app.use('/contact', require('./routes/contact.routes'));

app.use('/profile', require('./routes/profile.routes'));


app.get("*", (req, res) => res.redirect("/"));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.exports = app;

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("server running " + PORT))
