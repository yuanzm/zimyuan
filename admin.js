var User    = require('./proxy/user');
var Profile = require('./proxy/profile'); 

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

		User.newAndSave(account, password, email, nick_name, function(err, user) {
			if ( err )
				return console.log(err);

			console.log('admin user is cerated successfully');
			callback(user);
		});
	});
}

function createProfile(userid) {
	var avatar = '';
	var info = "Web engineer from the Tencent, focusing all his efforts on web development for this thing called 'Front End'. One day he hopes to make something that can record his life.";
	var experience = [
		'1993年出生',
		'2009中考',
		'2012高考',
		'2016工作'
	];
	var hobby = [
		'跑步',
		'篮球',
		'编程',
		'喝茶'
	];
	var hate = [
		'拖延症'
	];
	var thinking = [
		'性能'
	];

	Profile.getProfileByUserId(userid, function(err, profile) {
		if ( err )
			return console.log(err);		

		if ( profile )
			return;

		Profile.newAndSave(userid, avatar, info, experience, hobby, hate, thinking, function(err, profile) {
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
