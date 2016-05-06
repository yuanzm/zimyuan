var eventproxy = require('eventproxy');
var ready = require('ready');
var User = require('../../proxy/user');
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

	exports.ready(true);	
});

createUser(function(err, user) {
	ep.emit('user', user)
});

createUser(function(err, user) {
	ep.emit('user2', user);
});