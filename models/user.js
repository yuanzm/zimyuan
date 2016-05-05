 var mongoose  = require('mongoose'),
 	 Schema    = mongoose.Schema,
 	 ObjectId  = Schema.ObjectId,
 	 BaseModel = require('./base_model');

var UserSchema = new Schema({
	account    : {type: String},					 // 用户账号
	password   : {type: String},					 // 用户密码

	email      : {type: String},					 // 用户邮箱
	nick_name  : {type: String}, 					 // 用户昵称

	role 	   : {type: String}, 					 // 用户角色，默认为管理员

	create_at  : {type: Date, default: Date.now},	 // 用户创建时间
	update_at  : {type: Date, default: Date.now},	 // 用户更新时间

	deleted    : {type: Boolean, default: false}	 // 用户是否被删除
});

UserSchema.plugin(BaseModel);

mongoose.model('User', UserSchema);
