// Requirements
var express = require('express'); //Express Web Server 
var path = require('path'); //used for file path
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy'); //middleware for form/file upload
var mongoose = require('mongoose'); //used for database connections

// initialize conection
mongoose.connect('localhost:27017/nodetest');

// initialize server
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/fonts/', express.static(path.join(__dirname, 'public/fonts')));

app.use(function (req, res, next) {
    req.db = mongoose.connection;
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/users'));

// Api routes
app.use('/api', require('./routes/api/user'));
app.use('/api', require('./routes/api/word'));
app.use('/api', require('./routes/api/language'));
app.use('/api', require('./routes/api/vocabulary'));


// error handlers

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;