var eventproxy = require('eventproxy');
var ready      = require('ready');
var User       = require('../../proxy/user');
var Note  	   = require('../../proxy/note');
var Notebook   = require('../../proxy/notebook');
var Article    = require('../../proxy/article');
var ep 		   = new eventproxy();

ep.fail(function(err) {
	console.log(err);
});

function randomInit() {
	return (Math.random() * 10000).toFixed(0);
}

var createUser = exports.createUser = function(callback) {
	// account, password, email, nick_name
	var key = new Date().getTime() + '_' + randomInit();

	var account   = 'zimyuan' + key;
	var password  = 'zimyuan';
	var email     = key + '1229084233@qq.com';
	var nick_name = 'zimyuan';

	User.newAndSave(account, password, email, nick_name, callback);
}

var createNotebook = exports.createNotebook =  function(user, callback) {
	var title   = 'test' + Math.random(100);
	var private = false;

	Notebook.newAndSave(title, user._id, private, callback);
}

var createNote = exports.createNote = function(user, notebook, callback) {
	var title = "test" + Math.random(100);
	var contetn = 'test';
	var author = user._id;
	var notebook = notebook._id;
	var tab = 'life';
	var private = false;

	Note.newAndSave(title, contetn, author, notebook, tab, private, callback);
}

var createArticle = exports.createArticle = function(user, type, callback) {
	var title   = "测试文章";
	var content = "当有人问起你JavaScript有什么特点的时候，你可能立马就想到了单线程、事件驱动、面向对象等一堆词语，但是如果真的让你解释一下这些概念，可能真解释不清楚。有句话这么说：如果你不能向一个6岁小孩解释清楚一个东西，那么你自己也不懂这个东西。这句话或许有点夸张，但是极其有道理。个人觉得，如果需要掌握一门语言，掌握它的API只是学了皮毛，理解这门语言的精髓才是重点。提及JavaScript的精髓，this、闭包、作用域链、函数是当之无愧的。这门语言正式因为这几个东西而变得魅力无穷。";
	var tab     = "随笔"; 

	Article.newAndSave(type, title, content, user._id, tab, callback);
}

function mockUser(user) {
 	return 'mock_user=' + JSON.stringify(user) + ';';
}

ready(exports);

ep.all('user', 'user2', function(user, user2) {
	exports.normalUser = user;
	exports.normalUserCookie = mockUser(user);
	ep.emit('user-create');

	exports.normalUser2 = user2;
	exports.normalUser2Cookie = mockUser(user2);
	ep.emit('user2-create');

	createArticle(user, 'blog', ep.done('blog'));
	createArticle(user, 'photo', ep.done('photo'));

	ep.all('blog', 'photo', function(blog, photo) {
		exports.invalidUser = mockUser({_id: blog._id})

		exports.blog = blog;
		exports.photo = photo;

		ep.emit('reply');
	});

	createNotebook(user, ep.done('notebook'));

	ep.on('notebook', function(notebook) {
		exports.notebook = notebook;

		createNote(user, notebook, ep.done('note'));		
	});
});

createUser(function(err, user) {
	ep.emit('user', user)
});

createUser(function(err, user) {
	ep.emit('user2', user);
});

ep.all('note', 'reply', function(note) {
	exports.note = note;
	exports.ready(true);
});