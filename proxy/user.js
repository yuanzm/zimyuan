var EventProxy  = require('eventproxy'),
	models		= require('../models'),
	User		= models.User;

/**
 * @desc: 新建一篇文章
 * @param {String} type: 文章类型
 */
exports.newAndSave = function(account, password, email, nick_name, callback) {
	var user 	 = new User();

	user.account 	 = account;
	user.password 	 = password;
	user.email 		 = email;
	user.nick_name   = nick_name;

	user.save(callback);
};

/**
 * @desc: 根据id查询用户
 * @param {String} id: 用户id
 * @param {Function} callback: 查询回调函数
 */ 
exports.getUserById = function(id, callback) {
	if ( !id )
		return callback();

	User.findOne({_id: id}, callback);
};

/**
 * @desc: 根据account查询用户
 * @param {String} account: 用户账号
 * @param {Function} callback: 查询回调函数
 */ 
exports.getUserByAccount = function(account, callback) {
	User.findOne({account: account}, callback);
};

/**
 * 根据关键字，获取一组用户
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {String} query 关键字
 * @param {Object} opt 选项
 * @param {Function} callback 回调函数
 */
exports.getUsersByQuery = function (query, opt, callback) {
  	User.find(query, '', opt, callback);
};


