var express      = require('express'),
    config       = require('./config'),
    path         = require('path'),
    favicon      = require('serve-favicon'),
    logger       = require('morgan'),
    session      = require('express-session'),
    cookieParser = require('cookie-parser')(config.session_secret),
    bodyParser   = require('body-parser'),
    routes       = require('./router'),
    app          = express();

var RedisStore = require('connect-redis')(session);

// 数据库连接
require('./models');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: config.session_secret,
    store: new RedisStore({
        port: config.redis_port,
        host: config.redis_host,
        db  : config.redis_db
    }),
    resave: true,
    saveUninitialized: true,
}));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;