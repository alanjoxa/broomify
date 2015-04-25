var http = require('http');
var request = require('request');
var express = require('express');
var app = express();
var _ = require('underscore');
var path = require('path');
var bodyParser = require('body-parser');
var Pair = require('./service/pair.js');
var ip = require('./service/ip.js');
var routes = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


routes(app); // attach all routes
process.argv.forEach(function(val, index, array) {
    if (val.indexOf('=') !== -1) {
        var arg = val.split("=");
        process.env[arg[0]] = arg[1];
    }
});

var proxyServer = +process.env['-from'] || +process.env['NODE_PORT'] || 8888;

var server = http.createServer(app).listen(proxyServer, function(){
	console.log('Proxyserver started at ' + proxyServer);
});
//console.log(server.address());
var config = server.address();
config.address = ip;
console.log(ip);
Pair.setServer(config);
