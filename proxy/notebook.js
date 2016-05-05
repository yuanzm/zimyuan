var EventProxy  = require('eventproxy'),
	models		= require('../models'),
	Note 		= models.Note,
	Notebook	= models.Notebook;

/**
 * @desc: 新建一个笔记本
 * @param {String} title: 笔记标题
 * @param {String} author: 笔记作者
 * @param {Boolean} private: 是否
 * @param {Function} callback: 查询回调函数
 */
exports.newAndSave = function(title, author, private, callback) {
	var notebook 		 = new Notebook();

	notebook.title 	 	= title;
	notebook.author     = author;
	notebook.private    = private;

	notebook.save(callback);
};

/**
 * @desc: 根据笔记本id查询所有笔记
 * @param {String} id: 笔记本id
 * @param {Function} callback: 查询回调函数
 */ 
exports.getNotebookById = function(id, callback) {
	if ( !id )
		return callback();

	Note.find({notebook: id}, callback);
};
