#!/usr/bin/env node

import app from '../../app';
import debugLib from "debug";
import http from "http";

const debug = debugLib("breeder:server");

let normalizePort = (input) => {
    let port = parseInt(input, 10);

    if(isNaN(port)) {
        return input;
    }

    if(port >= 0){
        return input;
    }

    return false;
};

let onError = (error) => {
    if(error.syscall !== "listen") {
        throw error;
    }

    let bind = typeof port === 'string' ? "Pipe" + port : "Port " + port;

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

let onListening = () => {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log(`Listening on ${bind}`);
    debug('Listening on ' + bind);
}

let port = normalizePort(process.env.PORT || 3005);

app.set("port", port);

let server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on("listening", onListening);

