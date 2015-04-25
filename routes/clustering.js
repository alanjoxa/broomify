"use strict";

var express = require('express');
var router = express.Router();
var cluster = require('../service/cluster');
var remoteserver = require('../service/remoteserver');
var cache = require('../service/cache');

/*
If data is available in cache memory, will get it form cache.
else fire the lookup request to check if any other app in the cluster has this data, and get the list of those apps.
else get it from the server and keep it in the cache.
*/

router.get('/getdata', function(req, res) {
	if(cache.has(req.query)) {
		return res.json(cache.get(req.query));
	}
	cluster.lookup(req.query, function(peerList) {
		if(peerList.length) {
			//get from the first peer
		} else {
			remoteserver.getData(req.query, function(err, data) {
				if(err) res.send(err);
				else {
					cache.put(req.query, data);
					res.json(data);
				}
			});
		}
	})
});

module.exports = router;