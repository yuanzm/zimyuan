
var _defaultConfig = {
	delay : '1500',	// 显示提示的时间
	// qingsong__loading_only-text
	tpl   : ['<div class="qingsong__loading {{only_text}}">',
				'<div class="qingsong__loading-loader"></div>',
				'<div class="qingsong__loading-text">{{text}}</div>',
			 '</div>'].join('')
};

function Loading(options) {
	this.config = $.extend(_defaultConfig, options || {});
}

Loading.prototype = {
	_clearPrevLoader: function() {
		var $loaders = $('.qingsong__loading');

		if ( !$loaders.length )
			return;

		$loaders.remove();
	},

	showLoading: function(text) {
		this._clearPrevLoader();

		var loader = this.config.tpl
						.replace('{{text}}', text || '加载中...')
						.replace('{{only_text}}', ''),
			$loader = $(loader);

		$('body').append($loader);

		return $loader;
	},

	hideLoading: function() {
		this._clearPrevLoader();
	},

	showTips: function(text, cfg) {
		this._clearPrevLoader();

		var loader = this.config.tpl
						.replace('{{text}}', text)
						.replace('{{only_text}}', 'qingsong__loading_only-text'),
			$loader = $(loader);

		$('body').append($loader);
			
		var that = this,
			time = cfg && cfg.delay || this.config.delay;

		setTimeout(function() {
			that._clearPrevLoader();
			cfg && cfg.confirmOp && cfg.confirmOp();
		}, time);
	}
};

module.exports = Loading;
