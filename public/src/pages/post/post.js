var Dialog    = require('./../../components/dialog/dialog'),
	Loading   = require('./../../components/loading/loading');

function Login() {
	this.init();
}

Login.prototype = {
	init: function() {
		this.initPage();
		this.initDOM();
		this.bindEvent();
	},

	initPage: function() {
		this.dialog  = new Dialog();
		this.loading = new Loading();
	},

	initDOM: function() {
		this.$title   = $('#_j_title');
		this.$tab     = $('#_j_tab');
		this.$content = $('#_j_content'); 
		this.$preview = $('#_j_preview');
		this.$publish = $('#_j_publish');   
	},

	bindEvent: function() {
		this.$publish.on('click', this.submit.bind(this));
	},

	checkForm: function() {
		if ( this.$title.val() === '' ) {
			this.dialog.alert('文章标题不能为空');
			return false;
		}

		if ( this.$tab.val() === '' ) {
			this.dialog.alert('文章标签不能为空');
			return false;
		}

		if ( this.$content.val() === '' ) {
			this.dialog.alert('文章内容不能为空');
			return false;
		}

		return true;
	},

	getForm: function() {
		return {
			type    : 'blog',
			title   : this.$title.val(),
			tab     : this.$tab.val(),		
			content : this.$content.val(),		
		};
	},

	submitForm: function(data, callback) {
		$.ajax({
			url : "/article/create",
			type: "POST",
			data: data,
			success: function(data) {
				callback && callback(data);
			}
		});
	},

	submit: function() {
		var that = this;
		var check = this.checkForm();

		if ( !check )
			return;

		this.submitForm(that.getForm.call(that), function(data) {
			if ( data.errcode !== 0 ) {
				that.dialog.alert(data.message || '发布出错');
			}

			else 
				that.loading.showTips('发布成功', {
					confirmOp: function() {
						// window.location.href = "/admin/index";
					}
				});
		});
	}
}

var login = new Login();
