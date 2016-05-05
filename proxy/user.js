var EventProxy  = require('eventproxy'),
	models		= require('../models'),
	User		= models.User;

/**
 * @desc: 新建一篇文章
 * @param {String} type: 文章类型
 */
exports.newAndSave = function(account, password, email, nick_name, role, callback) {
	var user 	 = new User();

	user.account 	 = account;
	user.password 	 = password;
	user.email 		 = email;
	user.nick_name   = nick_name;
	user.role		 = user.role;

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
