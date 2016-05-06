var validator 	   = require('validator'),
	EventProxy 	   = require('eventProxy'),
	config 		   = require('../config'),
	Note 	       = require('../proxy').Note,
	Notebook 	   = require('../proxy').Notebook,
	tools          = require('../common/tools');
	authMiddleWare = require('../middlewares/auth');

exports.showNotebook = function(req, res) {
	res.render('notebook/index');
};

exports.addNotebook = function(req, res, next) {
	var ep = new EventProxy();

	ep.fail(next);
	ep.on('add_note_book_error', function(errcode, message) {
		var rdata = {
			errcode: errcode,
			message: message
		};
		res.json(data);
	});

	var title      = validator.trim(req.body.title);
	var author     = validator.trim(req.body.author);   		
	var private    = req.body.private;

	var check = [title, author];

	if ( check.some(function(item) { return item === '' }) )
		return ep.emit('add_note_book_error', 422, '表单填写不完整');

	Notebook。getNotebookByTitle(title, function(err, book) {
		if ( err )
			return next(err);

		if ( book )
			return ep.emit('add_note_book_error', 422, '笔记本已经存在');

		Notebook.newAndSave(title, author, private, function(err, book) {
			if ( err ) 
				return next(err);

			var rdata = {
				errcode: 0,
				message: '创建成功'
			};

			res.json(data);
		});
	});
};

exports.delNotebook = function(req, res, next) {
	var ep = new EventProxy();

	ep.fail(next);
	ep.on('del_note_book_error', function(errcode, message) {
		var rdata = {
			errcode: errcode,
			message: message
		};
		res.json(data);
	});

	var nid = req.body.notebook_id;

	if ( !nid )
		return epe.emit('del_note_book_error', 422, '缺少notebook_id字段');

	Notebook.getBookById(nid, function(err, book) {
		if ( err )
			return ep.emit('del_note_book_error', 422, '该笔记本不存在');

		if ( req.session.user.role !== 'manager' && book.author !== req.session.user._id )
			return ep.emit('del_note_book_error', 403, '没有权限删除该笔记本');

		Note.delAllNoteInOneBook(function(err) {
			if ( err )
				return next(err);

			book.deleted = 1;

			book.save(function(err) {
				if ( err )
					return next(err);

				var rdata = {
					errcode: 0,
					message: '删除成功'
				};
				res.json(data);
			});
		});

	});
};