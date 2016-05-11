require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"common":[function(require,module,exports){

},{}],"config":[function(require,module,exports){
/*
 * @author: zimyuan
 * @last-edit-date: 2015-12-30
 */

var config = {
}

module.exports = config;

},{}],1:[function(require,module,exports){
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

},{}]},{},[1]);
