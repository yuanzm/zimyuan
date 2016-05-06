var EventProxy  = require('eventproxy'),
	models		= require('../models'),
	Article		= models.Article;
	User 		= models.User;
	Reply 		= models.Reply;

/**
 * @desc: 新建一篇文章
 * @param {String} type: 文章类型
 * @param {String} title: 文章标题
 * @param {String} content：文章内容
 * @param {String} author: 文章作者
 * @param {String} tab: 文章标签
 * @param {Function} callback: 查询回调函数
 */
exports.newAndSave = function(type, title, content, author, tab, callback) {
	var article 	= new Article();

	article.type 	= type;
	article.title 	= title;
	article.content = content;
	article.author 	= author;

	article.save(callback);
};

/**
 * @desc: 根据id查询文章
 * @param {String} id: 文章唯一标示id
 * @param {Function} callback: 查询回调函数
 */
exports.getArticleById = function(id, callback) {
	var ep = new EventProxy();

	var events = ['article', 'author'];

	ep.assign(events, function(article, author) {

		if ( !article )
			return callback(null, null, null);

		return callback(null, article, author);

	}).fail(callback);

	Article.findOne({_id: id}, ep.done(function(article) {

		if ( !article ) {
			ep.emit('article', null);
			ep.emit('author', null);
			return;
		}

		ep.emit('article', article);

		User.getUserById(article.author, ep.done(function(author) {
			if ( !author ) {
				ep.unbind();
				return callback(null, '该用户不存在或者已经被销毁');
			}

			ep.emit('author', author);
		}));		
	}));
};

exports.getFullArticle = function(id, callback) {
	var ep = new EventProxy();

	var events = ['article', 'author', 'replies'];

	ep.assign(events, function(article, author, replies) {

		if ( !article )
			return callback(null, null, null, null);

		return callback(null, article, author, replies);

	}).fail(callback);

	Article.findOne({_id: id}, ep.done(function(article) {
		// 文章查询
		if ( !article ) {
			ep.unbind();
			return callback(null, '该文章不存在或者已经被删除');
		}
		ep.emit('article', article);

		User.getUserById(article.author, ep.done(function(author) {
			if ( !author ) {
				ep.unbind();
				return callback(null, '该用户不存在或者已经被销毁');
			}

			ep.emit('author', author);
		}) );

		Reply.getArticleRepliesById(article._id, ep.done('replies'));
	}));
};
