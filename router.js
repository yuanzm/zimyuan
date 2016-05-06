
/**
 * @desc: route.js
 * @author: zimyuan
 * @last-edit-date: 2016-05-0
 */

// 引入所需模块
var express = require("express"),
	// auth 	= require('./middlewares/auth'),
	// site 	= require("./controllers/site"),
	sign 	= require("./controllers/sign"),
	// user 	= require("./controllers/user"),
	// chat 	= require('./controllers/chat'),
	// config 	= require('./config'),
	// upload 	= require('./controllers/upload'),
	router  = express.Router();

// // home page
// router.get('/', site.index);
// router.get('/chat', chat.index);

// // 注册登录登出
// router.get('/signup', sign.showSignUp);	// 渲染注册页面
router.post('/signup', sign.signUp);	// 登录请求
// router.get('/signin', sign.showSignIn);	// 显示登录页面
// router.post('/signin', sign.signIn);		// 登录请求
// router.post('/signout', sign.signOut)	// 登出请求

// // 用户
// router.get('/user/:name', user.index);	// 显示用户个人中心
// router.get('/setting', user.showSetting);	// 显示用户设置中心
// router.post('/setting', auth.userRequired, user.setting);	// 更新用户设置请求	

// // 上传文件
// router.get('/uptoken', auth.userRequired, upload.uptoken);
// router.post('/downtoken', auth.userRequired, upload.downtoken);

module.exports = router;
