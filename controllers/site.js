var validator 	   = require('validator'),
	EventProxy 	   = require('eventproxy'),
	User 		   = require('../proxy').User,
	tools          = require('../common/tools'),
	authMiddleWare = require('../middlewares/auth');

exports.index = function(req, res) {
	res.render('home/home');
};