 var mongoose  = require('mongoose'),
 	 Schema    = mongoose.Schema,
 	 ObjectId  = Schema.ObjectId,
 	 BaseModel = require('./base_model');

var ProfileSchema = new Schema({
	user       : {type: ObjectId},	// 用户id
	avatar     : {type: String},	// 头像

	profile    : {type: String},	// 简介

	experience : {type: Array},		// 人生经历
	hobby      : {type: Array},		// 爱好
	hate	   : {type: Array},		// 讨厌
	thinking   : {type: Array},		// 思考

});

ProfileSchema.plugin(BaseModel);

mongoose.model('Profile', ProfileSchema);
