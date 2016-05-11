var Dialog    = require('./../../components/dialog/dialog'),
	Loading   = require('./../../components/loading/loading');

function Admin() {
	this.init();
}

Admin.prototype = {
	init: function() {
		this.initPage();
		this.initDOM();
		this.bindEvent();
	},

	initDOM: function() {
		this.$email = $('#_j_email');
	},

	initPage: function() {
		this.dialog = new Dialog();
		this.loading = new Loading();
	},

	bindEvent: function() {
		this.$email.on('click', this.sendEmail.bind(this));
	},

	sendEmail: function() {
		this.loading.showLoading('发送中...');

		var that = this;
		$.ajax({
			url: '/email',
			type: "POST",
			success: function(data) {
				that.loading.hideLoading();
				if ( data && data.errcode !== 0 )
					that.dialog.alert(data.message || "内部错误");

				else 
					that.loading.showTips('发送成功');
			}
		});
	}
};

this.Admin = new Admin();
