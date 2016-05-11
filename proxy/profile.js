var EventProxy  = require('eventproxy'),
	models		= require('../models'),
	Profile		= models.Profile;

/**
 * @desc: 新建profile
 * @param {String} user: 用户id
 * @param {String} avatar 用户头像
 * @param {String} profile: 简介
 * @param {String} experience: 生活经历
 * @param {String} hobby: 爱好
 * @param {String} hate: 憎恨
 * @param {String} thinking: 思考
 * @param {Function} callback: 查询回调函数
 */
exports.newAndSave = function(user, avatar, info, experience, hobby, hate, thinking, education, callback) {
	var profile 	   = new Profile();

	profile.user       = user;
	profile.avatar 	   = avatar;
	profile.info       = info;
	profile.experience = experience;
	profile.hobby      = hobby;
	profile.hate       = hate;
	profile.thinking   = thinking;
	profile.education  = education;

	profile.save(callback);
};

/**
 * @desc: 根据用户id查询profile
 * @param {String} id: 用户id
 * @param {Function} callback: 查询回调函数
 */ 
exports.getProfileByUserId = function(id, callback) {
	Profile.findOne({user: id}, callback);
};
