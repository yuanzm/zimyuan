var validator 	   = require('validator'),
	EventProxy 	   = require('eventproxy'),
	config 		   = require('../config'),
	User 		   = require('../proxy').User,
	Article        = require('../proxy').Article,
	tools          = require('../common/tools'),
	authMiddleWare = require('../middlewares/auth'),
	marked         = require('marked');

exports.onePhoto = function(req, res, next) {
	res.render("photo/photo");
}