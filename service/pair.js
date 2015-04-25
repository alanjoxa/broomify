var SERVER_LIST = {};
var Pair = {};
var server = {};
var _ = require("underscore");
var crypto = require('./crypto.js');
var cluster = require("./cluster.js");
var request = require("request");
var KEYS = {
  "test" : 1
};

Pair.getKey = function(req) {
  //key : ip:port:secrectKey
  console.log(server);
  var address = server.address + "|" + server.port;
  var rand = (new Date()).getTime();
  var key = address + "|" + rand;
  KEYS[rand] = 1;
  return crypto.encrypt(key, "aaa");
}


/*
  options {
    key: "asdasda",
    name: "c1",
    address: "192.168.1.0:1111"
  }
*/
Pair.pair = function(options) {
  var key = KEYS[options.key];
  if( ! key) {
    console.log("Returning false " + options.key, KEYS);
    return false;
  }
  cluster.addServer({
    name: options.name,
    address: options.address
  });
  return true;
}

Pair.connect = function(key, callback) {
  var address = crypto.decrypt(key, "aaa");
  var serverDetail = address.split("|");
  if(serverDetail.length != 3) {
    callback(false);
    return;
  }
  var url = "http://" + serverDetail[0] + ":" + serverDetail[1] + "/pair";
  var key = serverDetail[2];

  var reqOptions = {
    uri: url,
    method: "POST",
    headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      key: key,
      name: "a",
      address: server.address + ":" + server.port
    })
  }

  request(reqOptions, function(err, res, body) {
    if(err || !body) {
      callback(false);
      return;
    }
    try {
      var body = JSON.parse(body);
      if(body.status) {
        cluster.addServer({
          name: "a",
          address: serverDetail[0] + ":" + serverDetail[1]
        });
        callback(true);
        return;
      }
    } catch(e) {
      console.log(e);
    }
    callback(false);
  });

}

Pair.setServer = function(config) {
  server = config;
}

module.exports = Pair;
