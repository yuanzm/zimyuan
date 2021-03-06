/**
 * @desc: models出口文件
 * @author: zimyuan
 * @last-edit_date: 2016-05-05
 */

var mongoose = require('mongoose'),
	config   = require('../config.js');

mongoose.connect(config.db, function(err) {
	if (err)
		return console.log('connect to %s error', config.db, err.message);

	console.log('database connect success');
});

// models
require('./user.js');
require('./article.js');
require('./reply.js');
require('./note.js');
require('./notebook.js');
require('./profile.js');

exports.User 	 = mongoose.model('User');
exports.Article  = mongoose.model('Article');
exports.Reply    = mongoose.model('Reply');
exports.Note     = mongoose.model('Note');
exports.Notebook = mongoose.model('Notebook');
exports.Profile  = mongoose.model('Profile');
