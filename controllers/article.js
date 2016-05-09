var validator 	   = require('validator'),
	EventProxy 	   = require('eventproxy'),
	config 		   = require('../config'),
	User 		   = require('../proxy').User,
	Article        = require('../proxy').Article,
	tools          = require('../common/tools');
	authMiddleWare = require('../middlewares/auth');

/**
 * @desc: 创建一篇文章
 */
exports.addArticle = function(req, res, next) {
	var ep = new EventProxy();

	ep.fail(next);
	ep.on('add_article_error', function(errcode, message) {
		var rdata = {
			errcode: errcode,
			message: message
		};
		res.json(rdata);
	});

	var author  = req.session.user._id;

	var type    = req.body.type;
	var title   = req.body.title;
	var content = req.body.content;   		
	var tab     = req.body.tab;

	var check = [type, title, content];

	if ( check.some(function(item) { return item === '' }) )
		return ep.emit('add_article_error', 422, '表单字段填写不完整');

	User.getUserById(author, ep.done(function(user) {
		if ( !user )
			return ep.emit('add_article_error', 422， '用户不存在');

		Article.newAndSave(type, title, content, author, tab, ep.done(function(article) {
			user.article_count += 1;
			user.save(function() {
				var rdata = {
					errcode: 0,
					message: '文章创建成功'
				};
				res.json(rdata);
			});
		}));	
	}));
}

/**
 * @desc: 更新一篇文章
 */
exports.updateArticle = function(req, res, next) {
	var ep = new EventProxy();

	ep.fail(next);
	ep.on('update_article_error', function(errcode, message) {
		var rdata = {
			errcode: errcode,
			message: message
		};
		res.json(rdata);
	});

	var userid  = req.session.user._id;

	var title   = req.body.title;
	var content = req.body.content;   		
	var tab     = req.body.tab;

	var check = [tab, title, content];

	if ( check.some(function(item) { return item === '' }) )
		return ep.emit('update_article_error', 422, '表单字段填写不完整');

	Article.getArticleById(ep.done(function(article, author) {
		if ( !article )
			return ep.emit('update_article_error', 422, '文章不存在');

		if ( req.session.user.role !== 'manager' && article.author !== userid )
			return ep.emit('del_note_book_error', 403, '没有权限');		

		article.title   = title;
		article.content = content;		
		article.tab     = tab;
		article.update_at = new Date();

		article.save(ep.done(function() {
			var rdata = {
				errcode: 0,
				message: '更新成功'
			};

			res.json(rdata);
		}));
	}));
}	

/**
 * @desc: 删除一篇文章
 */
exports.deleteArticle = function(req, res, next) {
	var ep = new EventProxy();

	ep.fail(next);
	ep.on('delete_article_error', function(errcode, message) {
		var rdata = {
			errcode: errcode,
			message: message
		};
		res.json(rdata);
	});

	var userid     = req.session.user._id;
	var article_id = req.body.article_id;

	if ( !article_id )
		return ep.emit('delete_article_error', 422, '请输入article_id字段');

	Article.getArticleById(ep.done(function(article, author) {
		if ( !article )
			return ep.emit('delete_article_error', 422, '文章不存在');

		if ( req.session.user.role !== 'manager' && article.author !== userid )
			return ep.emit('delete_article_error', 403, '没有权限');		

		article.deleted = 1;
		article.save(ep.done('article_save'));

		author.article_count -= 1;
		author.save(ep.done('user_save'));

		ep.on('article_save', 'user_save', function() {
			var rdata = {
				errcode: 0,
				message: '删除成功'
			};

			res.json(rdata);
		});
	}));
}	

