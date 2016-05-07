var mongoose = require('mongoose');
var config = require('../config');
var UserModel  = mongoose.model('User');

var mockCookie = function(req, res, next) {
    if ( config.debug && req.cookies['mock_user'] ) {
        var mockUser     = JSON.parse(req.cookies['mock_user']);
        req.session.user = new UserModel(mockUser);
        return next();
    }
    next();
}

exports.mockCookie = mockCookie;
