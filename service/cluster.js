var serverList = [],
_ = require("underscore"),
request = require('request'),
async = require('async');


module.exports = {
	lookup : function(query, cb) {
		var hasList = [];
		var reqList = [];
		serverList.forEach(function(serverObj) {			
			reqList.push(function(cb) {
				request(serverObj.address + '/clusterlookup?' + serialize(query), function (error, response, body) {
					if (!error && response.statusCode == 200) {
						if(body.available) hasList.push(serverObj);
						cb();
					}
				});
			});

		});
		async.parallel(reqList, function(err, results) {
			if(err) console.log(err);
			cb(hasList);
		});
	},
	getData : function(peerList, cb) {
		
		peerList.forEach(function(serverObj) {			
			request(serverObj.address + '/clusterget?' + serialize(query), function (error, response, body) {
				if (!error && response.statusCode == 200) {
					try {
						cb(body);
					} catch(){}
				}
			});
		});
		async.parallel(reqList, function(err, results) {
			if(err) console.log(err);
			cb(hasList);
		});
	},
	addServer : function(serverObj) {
		serverList.push(serverObj);
	},
	removeServer : function(serverObj) {
		serverList = serverList.filter(function (el) {
			return el.name != serverObj.name;
		});
	}
}

function serialize(obj) {
	var querystring = [];
	for(var key in obj) {
		querystring.push(key + '=' obj[key]);
	}
	return querystring.join('&')
}