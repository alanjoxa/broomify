var serverList = [],
_ = require("underscore");

module.exports = {
	lookup : function(query, cb) {
		cb([]);
	},
	addServer : function(serverObj) {
		serverList.push(serverObj);
	},
	removeServer : function(argument) {
		// body...
	}
}