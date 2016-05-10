/**
 * @author: zimyuan
 * @last-edit_date: 2016-05-04
 */

var mongoose  = require('mongoose'),
	Schema    = mongoose.Schema,
	ObjectId  = Schema.ObjectId;
	BaseModel = require('./base_model');

var ArticleSchema = new Schema({
	type		: {type: String},					// 类型，包括blog和photo

	title       : {type: String},					// 文章标题
	content 	: {type: String},					// 文章内容

	author      : {type: ObjectId},					// 作者

	top			: {type: Boolean, default: false},	// 是否是置顶帖子
	good 		: {type: Boolean, default: false},	// 是否是被推荐的帖子

	reply_count : {type: Number, default: 0},		// 回复数量
	visit_count : {type: Number, default: 0},		// 阅读数量

	create_at   : {type: Date, default: Date.now},	// 创建时间
	update_at   : {type: Date, default: Date.now},	// 更新时间

	tab         : {type: String},					// 标签
	deleted     : {type: Boolean, default: false},	// 文章是否被删除	
});

ArticleSchema.plugin(BaseModel);
ArticleSchema.index({create_at: -1});

mongoose.model('Article', ArticleSchema);
