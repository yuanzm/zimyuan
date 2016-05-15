require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// http://jsfiddle.net/gh/get/jquery/1.9.1/icattlecoder/jsfiddle/tree/master/ajaxupload
},{}],"common":[function(require,module,exports){

},{}],"config":[function(require,module,exports){
/*
 * @author: zimyuan
 * @last-edit-date: 2015-12-30
 */

var config = {
}

module.exports = config;

},{}],"databus":[function(require,module,exports){
var config      = require('config');

var dataBus = {
	fetchOneNote: function(id, callback) {
		$.ajax({
			url: '/note/' + id,
			type: 'GET',
			success: function(data) {
				callback && callback(data);
			}
		});
	}	
};

module.exports = dataBus;

},{"config":"config"}]},{},[1]);
