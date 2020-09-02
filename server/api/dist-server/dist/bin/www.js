#!/usr/bin/env node
"use strict";

var _app = _interopRequireDefault(require("../../app"));

var _debug = _interopRequireDefault(require("debug"));

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var debug = (0, _debug.default)("breeder:server");

var normalizePort = function normalizePort(input) {
  var port = parseInt(input, 10);

  if (isNaN(port)) {
    return input;
  }

  if (port >= 0) {
    return input;
  }

  return false;
};

var onError = function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === 'string' ? "Pipe" + port : "Port " + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error(bind + " is already in use.");
      process.exit(1);
      break;

    default:
      throw error;
  }
};

var onListening = function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log("Listening on ".concat(bind));
  debug('Listening on ' + bind);
};

var port = normalizePort(process.env.PORT || 3005);

_app.default.set("port", port);

var server = _http.default.createServer(_app.default);

server.listen(port);
server.on('error', onError);
server.on("listening", onListening);