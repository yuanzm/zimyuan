var eventproxy = require('eventproxy');
var ready = require('ready');
var User = require('../../proxy/user');
var Note = require('../../proxy/note');
var Notebook = require('../../proxy/notebook');
var ep = new eventproxy();

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

ep.on('note', function(note) {
	exports.note = note;
	exports.ready(true);
});