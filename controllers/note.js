var validator 	   = require('validator'),
	EventProxy 	   = require('eventProxy'),
	config 		   = require('../config'),
	Note 		   = require('../proxy').Note,
	tools          = require('../common/tools');
	authMiddleWare = require('../middlewares/auth');

exports.showNote = function(req, res) {
	res.render('note/index');
};

exports.addNote = function(req, res, next) {
	var ep = new EventProxy();

	ep.fail(next);
	ep.on('add_note_error', function(errcode, message) {
		var rdata = {
			errcode: errcode,
			message: message
		};
		res.json(data);
	});

	var title      = validator.trim(req.body.title);
	var content    = validator.trim(req.body.content);
	var author     = validator.trim(req.body.author);   		
	var notebook   = validator.trim(req.body.notebook);
	var tab        = validator.trim(req.body.tab);
	var private    = req.body.private;

	var check = [title, content, author, notebook, tab];

	if ( check.some(function(item) { return item === '' }) )
		return ep.emit('add_note_error', 422, '表单填写不完整');

};