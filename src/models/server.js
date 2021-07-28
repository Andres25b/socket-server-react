// *======= Imports =======
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');

// *======= classes =======
const Sockets = require('./sockets');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		// *HTTP Server
		this.server = http.createServer(this.app);

		// * Socket config
		this.io = socketIO(this.server, {
			/* <confings></confings> */
		});
	}

	middlewares() {
		this.app.use(express.static(path.resolve(__dirname, '../../public')));
		this.app.use(cors());
	}

	configureSockets() {
		new Sockets(this.io);
	}

	execute() {
		// *Initialize middlewares
		this.middlewares();

		// *Initializer sockets
		this.configureSockets();

		// *Initialize server
		this.server.listen(this.port, () =>
			console.log(`Server online on port: ${this.port}`)
		);
	}
}

module.exports = Server;
