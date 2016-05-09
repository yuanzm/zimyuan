var validator 	   = require('validator'),
	EventProxy 	   = require('eventproxy'),
	User 		   = require('../proxy').User,
	Profile 	   = require('../proxy').Profile,
	Article 	   = require('../proxy').Article,
	Note 	   	   = require('../proxy').Note,
	tools          = require('../common/tools'),
	authMiddleWare = require('../middlewares/auth');

var ADMINACCOUNT = 'zimyuan';

exports.index = function(req, res, next) {
	var ep = new EventProxy();
	ep.fail(next);
	ep.all('user', 'article', 'photo', 'note', 'profile', function(user, article, photo, note, profile) {
		console.log(note);

		res.render('home/home', {
			user    : user,
			article : article,
			photo   : photo,
			note    : note,
			profile : profile
		});
	});

	// 查询用户信息
	User.getUserByAccount(ADMINACCOUNT, ep.done('user'));
	ep.on('user', function(user) {
		Profile.getProfileByUserId(user._id, ep.done('profile'));
	});
	// 查询最新的两篇文章
	Article.getLastArticles('article', 2, ep.done('article'));
	// 查询最新的两个相册
	Article.getLastArticles('photo', 2, ep.done('photo'));
	// 查询最新的笔记
	Note.getLastNotes(2, ep.done('note'));
};
