"use strict";

var express = require('express');
var router = express.Router();
var Pair = require("../service/pair");

router.get('/key', function(req, res) {
	res.json({key: Pair.getKey(req)});
});

router.post('/pair', function(req, res) {
	var status = Pair.pair(req.body);
	res.json({
		status: status
	});
});

router.post('/connect', function(req, res) {
	Pair.connect(req.body.key, function(status) {
		res.json({
			status: status
		});
	});
})


module.exports = router;
