
var validator 	   = require('validator'),
	EventProxy 	   = require('eventProxy'),
	User 		   = require('../proxy').User,
	tools          = require('../common/tools'),
	authMiddleWare = require('../middlewares/auth');

exports.showSignUp = function(req, res) {
	res.render('sign/signup');
};

exports.showLogin = function(req, res) {
	res.render('sign/login');
};

exports.signUp = function(req, res, next) {
	var ep = new EventProxy();		

	ep.fail(next);
	ep.on('sign_up_error', function(errcode, message) {
		var rdata = {
			errcode: errcode,
			message: message
		};
		res.json(rdata);
	});

	var account    = validator.trim(req.body.account).toLowerCase();
	var email      = validator.trim(req.body.email);
	var nick_name  = validator.trim(req.body.nick_name); 
	var password   = validator.trim(req.body.password);
	var rePassword = validator.trim(req.body.rePassword);

	if ( [account, email, nick_name, password, rePassword].some(function(item) { return item === '' }) ) {
		return ep.emit('sign_up_error', 422, '信息填写不完整');
	}

	if (!validator.isEmail(email))
    	return ep.emit('sign_up_error', 422, '邮箱不合法');

  	if ( password !== rePassword )
	    return ep.emit('sign_up_error', 422, '两次密码输入不一致。');

	var query = {
		'$or': {
			account : account,
			email   : email
		}
	};

	User.getUsersByQuery(query, {}, function(err, user) {
		if ( err )
			return next(err);

		if ( user.length )
			return ep.emit('sign_up_error', 422, '登录名或者邮箱被占用');


	    tools.bhash(password, function (passhash) {
		    User.newAndSave(account, passhash, email, nick_name, false, function (err) {
    	    	if (err)
          			return next(err);

          		var rdata = {
          			errcode: 0,
          			message: '注册成功'
          		};
          		res.json(rdata);
      		});
      	});
	});
}

exports.login = function(req, res, next){
	var ep = new EventProxy();		

	ep.fail(next);
	ep.on('login_error', function(errcode, message) {
		var rdata = {
			errcode: errcode,
			message: message
		};
		res.json(rdata);
	});

	var account    = validator.trim(req.body.account).toLowerCase();
	var password   = validator.trim(req.body.password);

	if ( [account, password].some(function(item) { return item === '' }) )
		return ep.emit('login_error', 422, '信息填写不完整');

    User.getUserByAccount(account, function(err, user) {
    	if ( err )
    		return next(err);

    	if ( !user.length )
    		return ep.emit('login_error', 422, '用户不存在！');

    	var passhash = user.password;

    	tools.bcompare(password, passhash, function (bool) {
    		if ( !bool )
    			return ep.eimt('login_error', 422, '用户密码错误');

    		// store session cookie
      		authMiddleWare.gen_session(user, res);

      		var rdata = {
      			errcode: 0,
      			message: '登录成功'
      		};

      		res.json(rdata);
    	});
    });
}