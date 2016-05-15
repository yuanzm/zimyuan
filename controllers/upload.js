
var qiniu = require("qiniu"),
	config = require('../config');

qiniu.conf.ACCESS_KEY = config.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.SECRET_KEY;
var bucket = config.bucket;

exports.uptoken = function(req, res, next) {
	var key = (  req.body.filename
			   ? bucket + ":" + req.body.filename
			   : bucket )  

	var putPolicy = new qiniu.rs.PutPolicy(key);
	var token = putPolicy.token();

	console.log(token);

	res.header("Cache-Control", "max-age=0, private, must-revalidate");
  	res.header("Pragma", "no-cache");
  	res.header("Expires", 0);
  	if (token) {
    	res.json({
          	uptoken: token
      	});
  	}
}
