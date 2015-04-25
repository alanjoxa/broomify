var SERVER_LIST = {};
var Pair = {};
var _ = require("underscore");
var KEYS = {
  "test" : 1
};

Pair.getKey = function() {
  return "test";
}


/*
  options {
    key: "asdasda",
    name: "c1",
    client: "192.168.1.0:1111"
  }
*/
Pair.connect = function(options) {
  var key = KEYS[options.key];
  if( ! key) {
    return false;
  }
  console.log("Adding " + options.client + " to client list");
  SERVER_LIST[options.client] = options.name;
  return true;
}

Pair.getAllClients = function() {
  return _.extend({}, SERVER_LIST);
}

module.exports = Pair;
