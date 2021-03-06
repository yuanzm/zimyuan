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
exports.newAndSave = function(title, author, private, desc, callback) {
	var notebook 		 = new Notebook();

	notebook.title 	 	= title;
	notebook.author     = author;
	notebook.private    = private;
	notebook.desc 		= desc;

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


/**
 * @desc: 根据笔记本标题查询笔记本
 * @param {String} title: 笔记本标题
 * @param {Function} callback: 查询回调函数
 */ 
exports.getNotebookByTitle = function(title, callback) {
	Notebook.find({title: title}, callback);
};

/**
 * @desc: 根据笔记本标题查询笔记本
 * @param {String} title: 笔记本标题
 * @param {Function} callback: 查询回调函数
 */ 
exports.getBookById = function(id, callback) {
	Notebook.findOne({_id: id}, callback);
};

exports.getLastNotebooks = function(count, callback) {
	Notebook.find({deleted: false}).limit(count).sort({create_at: -1}).exec(callback);
}

exports.countAllBook = function(callback) {
	Notebook.count({deleted: false}, callback);
}