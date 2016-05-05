var EventProxy  = require('eventproxy'),
	models		= require('../models'),
	Reply		= models.Reply;

/**
 * @desc: 新建一条回复
 * @param {String} email: 回复者邮箱
 * @param {String} nick_name： 回复者昵称
 * @param {String} content: 回复内容
 * @param {String} article_id: 回复所属文章
 * @param {Function} callback: 查询回调函数
 */
exports.newAndSave = function(email, nick_name, content, article_id, callback) {
	var reply 		 = new Reply();

	reply.email 	 = email;
	reply.nick_name  = nick_name;
	reply.content    = content;
	reply.article_id = article_id;

	reply.save(callback);
};

/**
 * @desc: 根据文章id查询回复
 * @param {String} id: 文章id
 * @param {Function} callback: 查询回调函数
 */ 
exports.getArticleRepliesById = function(id, callback) {
	if ( !id )
		return callback();

	Reply.findOne({_id: id}, callback);
};
