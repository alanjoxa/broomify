"use strict";

var express = require('express');
var router = express.Router();
var Pair = require("../pair");

router.get('/key', function(req, res) {
	res.json({key: Pair.getKey()});
});

router.post('/connect', function(req, res) {
	console.log(req.body);
	var status = Pair.connect(req.body);
	res.json({
		status: status
	});
});


module.exports = router;
