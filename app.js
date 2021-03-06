var express      = require('express'),
    config       = require('./config'),
    path         = require('path'),
    favicon      = require('serve-favicon'),
    logger       = require('morgan'),
    auth         = require('./middlewares/auth'),
    session      = require('express-session'),
    cookieParser = require('cookie-parser')(config.session_secret),
    bodyParser   = require('body-parser'),
    routes       = require('./router'),
    mongoose     = require('mongoose'),
    mockCookie   = require('./middlewares/mock_cookie').mockCookie,
    renderMiddleware = require('./middlewares/render'),
    app          = express();
    
require('colors');

var RedisStore = require('connect-redis')(session);

// 数据库连接
require('./models');
var initAdmin = require('./admin').initAdmin;
initAdmin();

// view engine setup
app.set('views', path.join(__dirname, 'public/src/pages'));
app.set('view engine', 'jade');
// if ( !config.debug )
    app.set('view cache', true);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// 渲染时间
// if (config.debug)
//     app.use(renderMiddleware.render);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser);
// app.use(express.static(path.join(__dirname, 'public')));
var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now());
    }
};
app.use(express.static(path.join(__dirname, 'public'), options));

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

// custom middleware
app.use(auth.authUser);

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