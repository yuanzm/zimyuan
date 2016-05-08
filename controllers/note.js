var validator 	   = require('validator'),
	EventProxy 	   = require('eventproxy'),
	config 		   = require('../config'),
	Note 		   = require('../proxy').Note,
	Notebook       = require('../proxy').Notebook,
	tools          = require('../common/tools');
	authMiddleWare = require('../middlewares/auth');

/**
 * @desc: 显示一篇note
 */
exports.showNote = function(req, res) {
	res.render('note/index');
};

/**
 * @desc: 新增一篇note
 */
exports.addNote = function(req, res, next) {
	var ep = new EventProxy();

	ep.fail(next);
	ep.on('add_note_error', function(errcode, message) {
		var rdata = {
			errcode: errcode,
			message: message
		};
		res.json(rdata);
	});

	var title      = req.body.title;
	var content    = req.body.content;
	var author     = req.body.author;   		
	var notebook   = req.body.notebook;
	var tab        = req.body.tab;
	var private    = req.body.private;

	var check = [title, content, author, notebook, tab];

	if ( check.some(function(item) { return item === '' }) )
		return ep.emit('add_note_error', 422, '表单填写不完整');

	Notebook.getBookById(notebook, ep.done(function(book) {
		if ( !book )
			return ep.emit('add_note_error', 403, '笔记本不存在');

		Note.newAndSave(title, content, author, notebook, tab, private, ep.done(function(note) {
			var rdata = {
				errcode: 0,
				message: '创建成功'
			};
			res.json(rdata);
		}));
	}));
};

/**
 * @desc: 更新一篇note
 */
exports.update = function(req, res, next) {
	var ep = new EventProxy();

	ep.fail(next);
	ep.on('update_note_error', function(errcode, message) {
		var rdata = {
			errcode: errcode,
			message: message
		};
		res.json(rdata);
	});

	var note_id    = validator.trim(req.body.note_id);
	var title      = validator.trim(req.body.title);
	var content    = validator.trim(req.body.content);
	var tab        = validator.trim(req.body.tab);
	var private    = req.body.private;

	var check = [note_id, title, content, tab];

	if ( check.some(function(item) { return item === '' }) )
		return ep.emit('update_note_error', 422, '表单填写不完整');

	Note.getNoteById(note_id, ep.done(function(note) {
		if ( !note )
			return ep.emit('update_note_error', 422, '该笔记不存在');

		if ( req.session.user.role !== 'manager' && note.author !== req.session.user._id )
			return ep.emit('update_note_error', 403, '没有权限');

		note.title   = title;
		note.content = content;
		note.tab     = tab;
		note.private = note.private;

		note.save(ep.done(function() {
			var rdata = {
				errcode: 0,
				message: '更新成功'
			};
			res.json(rdata);
		}));
	}));
};

/**
 * @desc: 删除一篇note
 */
exports.deleteNote = function(req, res, next) {
	var ep = new EventProxy();

	ep.fail(next);
	ep.on('delete_note_error', function(errcode, message) {
		var rdata = {
			errcode: errcode,
			message: message
		};
		res.json(rdata);
	});

	var note_id    = validator.trim(req.body.note_id);

	if ( !note_id )
		return epe.emit('delete_note_error', '422', '缺少note_id');

	Note.getNoteById(note_id, ep.done(function(note) {
		if ( !note )
			return ep.emit('delete_note_error', 422, '该笔记不存在');

		if ( req.session.user.role !== 'manager' && note.author !== req.session.user._id )
			return ep.emit('delete_note_error', 403, '没有权限');

		note.deleted = 1;

		note.save(ep.done(function() {
			var rdata = {
				errcode: 0,
				message: '删除成功'
			};
			res.json(rdata);
		}));
	}));
};