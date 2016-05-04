 var mongoose  = require('mongoose'),
 	 Schema    = mongoose.Schema,
 	 ObjectId  = Schema.ObjectId,
 	 BaseModel = require('./base_model');

var ReplySchema = new Schema({
	email      : {type: String},	// 回复者的邮箱
	nick_name  : {type: String}, 	// 回复者的昵称

	content    : {type: String},	// 回复内容
	article_id : {type: ObjectId},	// 文章id

	create_at  : {type: Date, default: Date.now},	// 回复创建时间
	update_at  : {type: Date, default: Date.now},	// 回复更新时间

	deleted    : {type: Boolean, default: false}	// 回复是否被删除
});

ReplySchema.plugin(BaseModel);
ReplySchema.index({topic_id: 1});

mongoose.model('Reply', ReplySchema);
