var validator 	   = require('validator'),
	EventProxy 	   = require('eventproxy'),
	config 		   = require('../config'),
	Reply 		   = require('../proxy').Reply,
	Article       = require('../proxy').Article,
	tools          = require('../common/tools');
	authMiddleWare = require('../middlewares/auth');

/**
 * @desc: 显示一篇note
 */
exports.addReply = function(req, res, next) {
	var ep = new EventProxy();

	ep.fail(next);
	ep.on('add_reply_error', function(errcode, message) {
		var rdata = {
			errcode: errcode,
			message: message
		};
		res.json(rdata);
	});

	var email      = req.body.email;
	var nick_name  = req.body.nick_name;
	var content    = req.body.content;   		
	var article_id = req.body.article_id;

	var check = [email, nick_name, content, article_id];

	if ( check.some(function(item) { return item === '' }) )
		return ep.emit('add_reply_error', 422, '表单字段填写不完整');

	if ( !validator.isEmail(email) )
		return ep.emit('add_reply_error', 422, '邮箱格式错误');

	Article.getArticleById(article_id, ep.done(function(article, author) {
		if ( !article )
			return ep.emit('add_reply_error', 422, '该文章不存在');

		Reply.newAndSave(email, nick_name, content, article_id, ep.done(function() {
			article.reply_count += 1;
			article.save(function() {
				var rdata = {
					errcode: 0,
					message: '评论成功'
				};

				res.json(rdata);
			});
		}));
	}));
}