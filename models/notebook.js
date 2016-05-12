 var mongoose  = require('mongoose'),
 	 Schema    = mongoose.Schema,
 	 ObjectId  = Schema.ObjectId,
 	 BaseModel = require('./base_model');

var NotebookSchema = new Schema({
	title 	   : {type: String},					// 笔记本标题
	desc       : {type: String},					// 笔记本描述
	author 	   : {type: ObjectId},					// 笔记本作者

	note_count : {type: Number, default: 0},		// 笔记本中笔记的条数

	create_at  : {type: Date, default: Date.now},	// 笔记本创建时间
	update_at  : {type: Date, default: Date.now},	// 笔记本更新时间

	deleted    : {type: Boolean, default: false},	// 笔记本是否被删除
	private	   : {type: String, default: false}		// 笔记本是否为私密内容
});

NotebookSchema.plugin(BaseModel);
NotebookSchema.index({author: 1});

mongoose.model('Notebook', NotebookSchema);
