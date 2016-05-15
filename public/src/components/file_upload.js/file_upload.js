/**
 * @author: zimyuan
 * @last-edit-date: 2015-01-23
 */

var config = require('config');
    
var _defaultConfig = {
	fileTypes      : ['jpg', 'png', 'gif'],
	timeout        : 10000,
    uploadPreview  : null,
	uploadProgress : null,
	uploadComplete : null,
	uploadFailed   : null,
    context        : null
}

function FileUpload(file, options) {
	this.config = $.extend(_defaultConfig, options || {});
	this.file = file;
}

FileUpload.prototype = {
	constructor: FileUpload,

	_getFileMsg: function(file) {
	    var name   = file.name,    
	        suffix = name.substr(name.lastIndexOf('.') + 1, name.length);

	    return {
	        name   : name,
	        type   : file.type,
	        suffix : suffix,
	        size   : file.size  
	    }
	},

	_readFile: function(file, callback) {
	    var reader, 
	        that = this;

	    if (typeof FileReader == 'undefied') 
	        return;

	    reader = new FileReader();
	    reader.readAsDataURL(file);

	    reader.onload = function() {
	        callback && callback(this.result);
	    }
	},

    _getUploadParams: function(suffix, type, callback) {
        var params = '?suffix=' + suffix + '&type=' + type;

        $.ajax({
            url: config.cgiList.getUploadParams + params,
            success: function(data) {
                callback && callback(JSON.parse(data.data));
            }
        }); 
    },

    _sendRequest: function(params, callback) {
        var form = new FormData(),
            that = this,
            url  = params['host'];

        // 处理必要参数
        form.append('key',                   params['filename']);
        form.append('policy',                params['policy']);
        form.append('OSSAccessKeyId',        params['accessid']);
        form.append('success_action_status', '200');
        form.append('signature',             params['signature']);
        form.append('callback',              params['callback']);
        
        // 添加图片数据
        form.append('file', this.file);

        this.url  = url;
        this.form = form; 
        
        $.ajax({
            url         : url,
            type        : 'POST',
            data        : form,
            processData : false,
            contentType : false, 
            beforeSend  : function(xhr, settings) {
                var context = that._getContext();

                if ( that.config.uploadProgress )
                    xhr.upload.addEventListener("progress", that.config.uploadProgress.bind(context), false);

                if ( that.config.uploadComplete ) 
                    xhr.addEventListener("load", that.config.uploadComplete.bind(context), false);

                if ( that.config.uploadFailed ) {
                    xhr.addEventListener("error", that.config.uploadFailed.bind(context), false);
                    xhr.addEventListener("abort", that.config.uploadFailed.bind(context), false);                    
                }

                that.xhr = xhr;
            },
            success     : function(data) {
                console.log(data);
            }
        });
    },

    _getContext: function() {
        var context = (  this.config.context 
               ? this.config.context
               : this );

        return context;
    },

    upload: function(file) {
        console.log(file);

        if ( file )
            this.file = file;

        var that    = this,
            fileMsg = this._getFileMsg(this.file),
            context = that._getContext();

        this._readFile(this.file, function(url) {
            if ( that.config.uploadPreview )
        	   that.config.uploadPreview.call(context, url);

	        that._getUploadParams(fileMsg.suffix, fileMsg.type, function(params) {
                that.config.getParamsCbk && that.config.getParamsCbk.call(context, params);

	            that._sendRequest.call(that, params, function(data) {
	                console.log(data);
	            });
	        });
        });
    },

    reUpload: function() {
        var that = this;

        if ( this.xhr ) {
            that.xhr.open("POST", that.url);
            that.xhr.send(that.form);
        }
    }
};

module.exports = FileUpload;
