var serverList = [],
_ = require("underscore");

module.exports = {
	lookup : function(query, cb) {
		cb([]);
	},
	addServer : function(serverObj) {
		console.log("Adding " + serverObj.address + " to client list");
		serverList.push(serverObj);
	},
	removeServer : function(argument) {
		// body...
	}
}
