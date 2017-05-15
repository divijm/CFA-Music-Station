var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
const authApi = require('./middleware/authApi');

var app = express();

var jwt = require('jsonwebtoken');
// Secretcode is a hash/salt. Encrypts it!
// JWT.Sign takes in two attributes - emails and password
var token = jwt.sign( {email: 'divij.mehra.16@gmail.com'}, 'secretcode');
console.log(token)

var mongoose = require('mongoose');

// database is called music_station
mongoose.connect('mongodb://localhost/musicStation');
const { connection: db } = mongoose;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to musicStation database');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api*', authApi);
app.use('/', index);
app.use('/users', users);

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
