"use strict";

module.exports = function (app) {
	app.use('/', require('./pairing'));
	app.use('/', require('./clustering'));
};