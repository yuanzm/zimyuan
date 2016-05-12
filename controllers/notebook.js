var validator 	   = require('validator'),
	EventProxy 	   = require('eventproxy'),
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
		res.json(rdata);
	});

	var title      = validator.trim(req.body.title);
	var private    = req.body.private;
	var author     = req.session.user._id; 
	var desc  	   = req.body.desc;

	var check = [title, author, desc];

	if ( check.some(function(item) { return item === '' }) )
		return ep.emit('add_note_book_error', 422, '表单填写不完整');

	Notebook.getNotebookByTitle(title, function(err, book) {
		if ( err )
			return next(err);

		if ( book.length )
			return ep.emit('add_note_book_error', 422, '笔记本已经存在');

		Notebook.newAndSave(title, author, private, desc, function(err, book) {
			if ( err ) 
				return next(err);

			var rdata = {
				errcode: 0,
				message: '创建成功'
			};

			res.json(rdata);
		});
	});
};

/**
 * @desc: 删除笔记本
 */ 
exports.delNotebook = function(req, res, next) {
	var ep = new EventProxy();

	ep.fail(next);
	ep.on('del_note_book_error', function(errcode, message) {
		var rdata = {
			errcode: errcode,
			message: message
		};
		res.json(rdata);
	});

	var nid = req.body.nid;

	if ( !nid )
		return ep.emit('del_note_book_error', 422, '缺少nid字段');

	// console.log(nid)
	Notebook.getBookById(nid, function(err, book) {
		if ( !book )
			return ep.emit('del_note_book_error', 422, '该笔记本不存在');

		if ( req.session.user.role !== 'manager' && book.author !== req.session.user._id )
			return ep.emit('del_note_book_error', 403, '没有权限删除该笔记本');

		Note.delAllNoteInOneBook(nid, function(err) {
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
				res.json(rdata);
			});
		});

	});
};

/**
 * @desc: 更新笔记本
 */ 
exports.update = function(req, res, next) {
	var ep = new EventProxy();

	ep.fail(next);
	ep.on('update_note_book_error', function(errcode, message) {
		var rdata = {
			errcode: errcode,
			message: message
		};
		res.json(rdata);
	});

	var nid     = req.body.nid;
	var title   = req.body.title;
	var private = req.body.private; 
	var desc  	   = req.body.desc;

	if ( nid === '' || title === '' )
		return ep.emit('update_note_book_error', 422, '表单填写不完整');

	Notebook.getBookById(nid, function(err, book) {
		if ( err )
			return next(err);

		if ( !book )
			return ep.emit('update_note_book_error', 422, '笔记本不存在');

		if ( req.session.user.role !== 'manager' && book.author !== req.session.user._id )
			return ep.emit('update_note_book_error', 403, '没有更新删除该笔记本');

		book.title 	    = title;
		book.private    = private;
		book.update_at  = new Date();
		book.desc       = desc;
	
		book.save(function(err) {
			if ( err )
				return next(err);

			var rdata = {
				errcode: 0,
				message: '更新成功'
			};
			res.json(rdata);
		});
	});
};
