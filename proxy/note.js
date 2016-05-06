var EventProxy  = require('eventproxy'),
	models		= require('../models'),
	Note		= models.Note;

/**
 * @desc: 新建一条笔记
 * @param {String} title: 笔记标题
 * @param {String} content 笔记内容
 * @param {String} author: 笔记作者
 * @param {String} notebook: 笔记本
 * @param {String} tab: 笔记标签
 * @param {Boolean} private: 是否
 * @param {Function} callback: 查询回调函数
 */
exports.newAndSave = function(title, content, author, notebook, tab, private, callback) {
	var note 		 = new Note();

	note.title 	 	= title;
	note.content    = content;
	note.author     = author;
	note.notebook   = notebook;
	note.tab     	= tab;
	note.private    = private;

	note.save(callback);
};

/**
 * @desc: 根据id查询笔记
 * @param {String} id: 笔记id
 * @param {Function} callback: 查询回调函数
 */ 
exports.getNoteById = function(id, callback) {
	if ( !id )
		return callback();

	Note.findOne({_id: id}, callback);
};

/**
 * @desc: 删除一个笔记本里面的所有笔记
 * @param {String} bookId: 笔记本id
 * @param {Function} callback: 查询回调函数
 */ 
exports.delAllNoteInOneBook = function(bookId, callback) {
	Note.update({notebook: bookId}, {$set: {deleted: true}}, {multi: true}, callback);
};
