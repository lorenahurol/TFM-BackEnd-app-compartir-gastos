const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const fs = require('fs');
const dayjs = require('dayjs');

const apiRouter = require('./routes/api');

// conectamos con la base de datos
require('./dbconfig');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Middleware de registro de peticiones
app.use((req, res, next) => {
  const data = `[${dayjs().format('DD-MM-YYYY HH:mm:ss')}] Método: ${req.method} - Url: ${req.url}\n`;
  fs.appendFile('./logs/main.log', data, (err) => {
    if (err) console.log(err);
    next();
  });
});

app.use('/api', apiRouter);


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
