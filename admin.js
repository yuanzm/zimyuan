var User    = require('./proxy/user');
var Profile = require('./proxy/profile'); 
var tools   = require('./common/tools');


var account   = 'zimyuan';
var password  = 'boss20100413wan';
var email     = '1229084233@qq.com';
var nick_name = 'zimyuan';

function createAdminUser(callback) {
	User.getUserByAccount(account, function(err,user) {
		if ( err )
		 	return console.log(err);

		if ( user )
			return callback(user);

		tools.bhash(password, function (err, passhash) {
			User.newAndSave(account, passhash, email, nick_name, function(err, user) {
				if ( err )
					return console.log(err);

				console.log('admin user is cerated successfully');
				callback(user);
			});
		})

	});
}

function createProfile(userid) {
	var avatar = '';
	var info = "Web engineer from the Tencent, focusing all his efforts on web development for this thing called 'Front End'. One day he hopes to make something that can record his life.";
	var experience = [
		'1993年出生于梅州',
		'2012年遇见了她',
		'2016年实习工作'
	];
	var hobby = [
		'无聊的时候跑跑步',
		'闲暇时间天天打篮球',
		'不为工作的编程',
		'讨点好茶叶解解渴'
	];
	var hate = [
		'拖延症'
	];
	var thinking = [
		'性能'
	];

	var education = [
		'2012年毕业于梅县东山中学',
		'2016年毕业于中山大学'
	];

	Profile.getProfileByUserId(userid, function(err, profile) {
		if ( err )
			return console.log(err);		

		if ( profile )
			return;

		Profile.newAndSave(userid, avatar, info, experience, hobby, hate, thinking, education, function(err, profile) {
			if ( err )
				return console.log(err);			

			console.log('admin profile is created successfully');
		});
	});
}

function initAdmin() {
	createAdminUser(function(user) {
		createProfile(user._id);
	});
}

exports.initAdmin = initAdmin;
