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
