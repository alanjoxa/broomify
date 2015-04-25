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

router.get('/clusterlookup', function(req, res) {
	res.json({
		available : cache.has(req.query)
	});
});

router.get('/clusterget', function(req, res) {
	res.json(cache.get(req.query));
});

router.get('/getdata', function(req, res) {
	if(cache.has(req.query)) {
		return res.json(cache.get(req.query));
	}
	cluster.lookup(req.query, function(peerList) {
		if(peerList.length) {
			cluster.getData(peerList, function(data) {
				res.json(data);
			});
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