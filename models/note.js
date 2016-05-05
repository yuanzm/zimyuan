/**
 * @author: zimyuan
 * @last-edit_date: 2016-05-05
 */

var mongoose  = require('mongoose'),
	Schema    = mongoose.Schema,
	ObjectId  = Schema.ObjectId;
	BaseModel = require('./base_model');

var NoteSchema = new Schema({
	title       : {type: String},					// 笔记标题
	content 	: {type: String},					// 笔记内容

	author      : {type: ObjectId},					// 作者
	notebook	: {type: ObjectId},					// 所归属的笔记本

	reply_count : {type: Number, default: 0},		// 回复数量
	visit_count : {type: Number, default: 0},		// 阅读数量

	create_at   : {type: Date, default: Date.now},	// 创建时间
	update_at   : {type: Date, default: Date.now},	// 更新时间

	tab         : {type: String},					// 标签
	deleted     : {type: Boolean, default: false},	// 文章是否被删除	

	private     : {type: Boolean, default: false},	// 是否为私密内容

});

NoteSchema.plugin(BaseModel);
NoteSchema.index({create_at: -1});

mongoose.model('Note', NoteSchema);
