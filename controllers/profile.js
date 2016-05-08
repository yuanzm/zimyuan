var validator 	   = require('validator'),
	EventProxy 	   = require('eventproxy'),
	config 		   = require('../config'),
	Profile 	   = require('../proxy').Profile,
	tools          = require('../common/tools');
	authMiddleWare = require('../middlewares/auth');

exports.addProfile = function(req, res, next) {
	var ep = new EventProxy();

	ep.fail(next);
	ep.on('add_profile_error', function(errcode, message) {
		var rdata = {
			errcode: errcode,
			message: message
		};
		res.json(rdata);
	});

	var userid     = req.session.user._id;

	var avatar     = req.body.avatar;
	var profile    = req.body.profile;
	var experience = req.body.experience;   		
	var hobby      = req.body.hobby;
	var hate       = req.body.hate
	var thinking   = req.body.thinking;	

	if ( !avatar || !profile )
		return ep.emit('update_profile_error', 422, '请输入头像和简介');

	if ( [experience, hobby, hate, thinking].some(function(item) {return !Array.isArray(item)}) )
		return ep.emit('update_profile_error', 422, 'experience,hobby,hate,thinking必须是数组');

	User.getUserById(userid, ep.done(function(user) {
		if ( !user )
			return ep.emit('update_profile_error', 422, '用户不存在');

		if ( req.session.user.role !== 'manager' && user._id !== userid )
				return ep.emit('del_note_book_error', 403, '没有权限');

		ep.emit('user_check', user);
	}));

	ep.on('user_check', function() {
		Profile.getProfileByUserId(user._id, ep.done(function(profile) {
			if ( profile )
				return ep.emit('update_profile_error', 422, '该用户的profile已经存在');

			Profile.newAndSave(userid, avatar, profile, experience, hobby, hate, thinking, ep.done(function() {
				profile.save(ep.done(function() {
					var rdata = {
						errcode: 0,
						message: '创建成功'
					};
					res.json(data);
				}));
			}));
		}));
	});
}

exports.updateProfile = function(req, res, next) {
	var ep = new EventProxy();

	ep.fail(next);
	ep.on('update_profile_error', function(errcode, message) {
		var rdata = {
			errcode: errcode,
			message: message
		};
		res.json(rdata);
	});

	var userid     = req.session.user._id;

	var avatar     = req.body.avatar;
	var profile    = req.body.profile;
	var experience = req.body.experience;   		
	var hobby      = req.body.hobby;
	var hate       = req.body.hate
	var thinking   = req.body.thinking;

	if ( !avatar || !profile )
		return ep.emit('update_profile_error', 422, '请输入头像和简介');

	if ( [experience, hobby, hate, thinking].some(function(item) {return !Array.isArray(item)}) )
		return ep.emit('update_profile_error', 422, 'experience,hobby,hate,thinking必须是数组');

	User.getUserById(userid, ep.done(function(user) {
		if ( !user )
			return ep.emit('update_profile_error', 422, '用户不存在');

		if ( req.session.user.role !== 'manager' && user._id !== userid )
				return ep.emit('del_note_book_error', 403, '没有权限');

		ep.emit('user_check', user);
	}));

	ep.on('user_check', function() {
		Profile.getProfileByUserId(user._id, ep.done(function(profile) {
			if ( !profile )
				return ep.emit('update_profile_error', 422, '该用户的profile不存在');

			profile.avatar     = avatar;
			profile.profile    = profile;
			profile.experience = experience;
			profile.hobby      = hobby;
			profile.hate       = hate;
			profile.thinking   = thinking;

			profile.update_at = new Date();

			profile.save(ep.done(function() {
				var rdata = {
					errcode: 0,
					message: '更新成功'
				};
				res.json(data);
			}));
		}));
	});
}
