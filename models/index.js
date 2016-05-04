/*
 * models出口文件
 */

var mongoose = require('mongoose'),
	config   = require('../config.js');

mongoose.connect(config.db, function(err) {
	if (err)
		return console.log('connect to %s error', config.db, err.message);

	console.log('database connect success');
});

// models
require('./article.js');
// require('./message.js');

exports.Article = mongoose.model('Article');
// exports.Message = mongoose.model('Message')