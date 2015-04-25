module.exports = {
	getData : function(query, cb) {
		cb({data : 'This is data for ' + JSON.stringify(query)});
	}
}