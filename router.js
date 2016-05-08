
/**
 * @desc: route.js
 * @author: zimyuan
 * @last-edit-date: 2016-05-0
 */

// 引入所需模块
var express  = require("express"),
	auth 	 = require('./middlewares/auth'),
	notebook = require('./controllers/notebook'),
	note     = require('./controllers/note'),
	site 	= require("./controllers/site"),
	sign 	 = require("./controllers/sign"),
	// user 	= require("./controllers/user"),
	// chat 	= require('./controllers/chat'),
	// config 	= require('./config'),
	// upload 	= require('./controllers/upload'),
	router   = express.Router();

// // home page
router.get('/', site.index);
// router.get('/chat', chat.index);

// // 注册登录登出
router.get('/signup', sign.showSignUp);	// 渲染注册页面
router.post('/signup', sign.signUp);	// 登录请求
// router.get('/signin', sign.showSignIn);	// 显示登录页面
router.post('/signin', sign.login);		// 登录请求
// router.post('/signout', sign.signOut)	// 登出请求

// 笔记本
router.post('/notebook/create', notebook.addNotebook);	// 创建笔记本
router.post('/notebook/update', notebook.update);		// 创建笔记本
router.post('/notebook/delete', notebook.delNotebook);	// 创建笔记本

// 笔记
router.post('/note/create', note.addNote);		// 创建笔记本
router.post('/note/update', note.update);		// 创建笔记本
router.post('/note/delete', note.deleteNote);	// 创建笔记本

// 上传文件
// router.get('/uptoken', auth.userRequired, upload.uptoken);
// router.post('/downtoken', auth.userRequired, upload.downtoken);

router.get('/test', sign.test);	// 登录请求

module.exports = router;
