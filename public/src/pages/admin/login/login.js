// var Dialog    = require('./../../components/dialog/dialog'),
// 	Loading   = require('./../../components/loading/loading');

// function Login() {
// 	this.init();
// }

// Login.prototype = {
// 	init: function() {
// 		this.initPage();
// 		this.initDOM();
// 		this.bindEvent();
// 	},

// 	initPage: function() {
// 		this.dialog = new Dialog();
// 		this.loading = new Loading();
// 	},

// 	initDOM: function() {
// 		this.$name = $('#_j_name'),
// 		this.$pass = $('#_j_pass');
// 		this.$btn = $('#_j_btn'); 
// 	},

// 	bindEvent: function() {
// 		this.$btn.on('click', this.submit.bind(this));
// 	},

// 	checkForm: function() {
// 		if ( this.$name.val() === '' ) {
// 			this.dialog.alert('管理员账号不能为空');
// 			return false;
// 		}

// 		if ( this.$pass.val() === '' ) {
// 			this.dialog.alert('管理员密码不能为空');
// 			return false;
// 		}

// 		return true;
// 	},

// 	getForm: function() {
// 		return {
// 			name: this.$name.val().trim(),
// 			pass: this.$pass.val().trim()			
// 		};
// 	},

// 	submitForm: function(data, callback) {
// 		$.ajax({
// 			url : "/adminlogin",
// 			type: "POST",
// 			data: data,
// 			success: function(data) {
// 				callback && callback(data);
// 			}
// 		});
// 	},

// 	submit: function() {
// 		var that = this;
// 		var check = this.checkForm();

// 		if ( !check )
// 			return;

// 		this.loading.showLoading('登录中...');
// 		this.submitForm(this.getForm(), function(data) {
// 			if ( data.errcode !== 0 ) {
// 				that.loading.hideLoading();
// 				that.dialog.alert(data.message || '登录出错');
// 			}

// 			else 
// 				that.loading.showTips('登录成功', {
// 					confirmOp: function() {
// 						window.location.href = "/admin/index";
// 					}
// 				});
// 		});
// 	}
// }

// var login = new Login();
