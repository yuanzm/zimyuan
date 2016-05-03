/**
 * @author: zimyuan
 * @last-edit-date: 2016-01-13
 */ 

var template = require('art-template'),
	tpl      = require('./dialog.html');

var _defaultConfig = {
	canRepeat     : false,			// 弹窗能够重复
	needAnimation : true,			// 弹窗显示是否已动画的形式
	hasTitle      : true,			// 弹窗是否有标题
	title         : '温馨提示',		// 默认标题
	btns          : 'twoBtn',		// 按钮个数
	cancelText    : '取消',
	confirmText   : '确定',
};

function Dialog(options) {
	this.config = $.extend(true, options || {}, _defaultConfig);
}

Dialog.prototype = {
	constructor: Dialog,

	alert: function(text, option) {
		option = option || {};

		var id = Math.floor((Math.random() * 1000) + 1);
		var rdata = {
			id          : 'j_dialog_' + id,
			hasTitle    : (  option.hasTitle === false
						   ? option.hasTitle
						   : this.config.hasTitle  ),
			title       : option.title || this.config.title,

			isHtml      : option.isHtml || 0,
			css         : option.css    || '',
			text        : text || '',

			btns        : (  ( option.btns 
							  && option.btns === 'oneBtn' )
						   ? 'qingsong-dialog__footer_one-btn'
						   : '' ),
			cancelText  : option.cancelText || this.config.cancelText,
			confirmText : option.confirmText || this.config.confirmText,			 

			cancelOp    : (  option.cancelOp
						   ? 'op__cancelOp__' + id
						   : 'close__' + id  ),
			confirmOp   : (  option.confirmOp
						   ? 'op__confirmOp__' + id
						   : 'close__' + id  ),

			openCbk     : option.openCbk || null
		};


		// 缓存事件处理函数
		this[id] = {};
		option.cancelOp  && (this[id].cancelOp = option.cancelOp);
		option.confirmOp && (this[id].confirmOp = option.confirmOp);

		// 弹窗内容是html，先不显示弹窗
		if ( rdata.isHtml )
			rdata.need_parse = 'ui-d-n';

		try {
			var html = template.render(tpl)(rdata);		
		} catch (e) {
			console.log(e.message);
			html = '';
		}

		$('body').append(html);

		var that = this;
		setTimeout(function() {
			$('#j_dialog_' + id)
				.find('.qingsong-dialog__content')
				.empty()
				.append(rdata.text);

			$('#j_dialog_' + id).removeClass('ui-d-n');

			that._bindEvent(rdata.id);

			rdata.openCbk && rdata.openCbk($('#j_dialog_' + id)); 
		}, 0);
	},

	_close: function(id) {
		$('#j_dialog_' + id).remove();
	},

	_btnClickHandler: function(instance, elem) {
		var op    = elem.data('op');

		if ( op.indexOf('close__') > -1 )
			instance._close(op.replace('close__', ''));

		else if ( op.indexOf('op__') > -1 ) {
			var arr  = op.split('__'),
				func = arr[1],
				id   = arr[2];

			if ( instance[id][func] ) {
				instance[id][func]($('#j_dialog_' + id));
				instance._close(id);
			}
		}

		else {
			alert('do not change the DOM structor!!');
		}
	},

	// 绑定事件处理程序
	_bindEvent: function(id) {
		var that = this,
			qId  = '#' + id;

		$(qId).on('click', '.qingsong-dialog__btn', function(e) {
			that._btnClickHandler(that, $(this));
		});
	}
}

module.exports = Dialog;
