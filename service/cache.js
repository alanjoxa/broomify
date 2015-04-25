var cacheObj = {};
module.exports = {
	has : function(query) {
		return !!this.get(query);
	},
	get : function(query) {
		return cacheObj[JSON.stringify(query)];
	},
	put : function(query, data) {
		cacheObj[JSON.stringify(query)] = data;
	}
}