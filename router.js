
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
	site 	 = require("./controllers/site"),
	sign 	 = require("./controllers/sign"),
	profile  = require("./controllers/profile"),
	article  = require('./controllers/article'),	
	config 	 = require('./config'),
	admin    = require('./controllers/admin'),
	// upload 	= require('./controllers/upload'),
	router   = express.Router();

// home page
router.get('/', site.index);

// 用户profile
router.get('/profile/:user?', profile.showProfile);

// 注册登录登出
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

// 文章
router.get('/blogs', article.blogIndex);				// 博客首页
router.get('/blog/:id?', article.blog);					// 一篇博客

router.post('/article/create', article.addArticle);		// 创建文章
router.post('/article/update', article.updateArticle);	// 更新文章
router.post('/article/delete', article.deleteArticle);	// 删除文章

// 管理端
router.get('/admin/login', admin.showLogin);			// 管理端登录页面

// 上传文件
// router.get('/uptoken', auth.userRequired, upload.uptoken);
// router.post('/downtoken', auth.userRequired, upload.downtoken);

router.get('/test', sign.test);	// 登录请求

module.exports = router;
