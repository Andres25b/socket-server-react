# Bases para servidor Socket

## Instalación de dependencias

- [Socket.io](https://www.npmjs.com/package/socket.io)
- [Express](https://www.npmjs.com/package/express)

# Configuración inicial.

```javascript
// *======= Imports =======
const express = require('express');
const app = express(); // ?Express server
const server = require('http').createServer(app); // ?Socket server
require('dotenv').config(); // ? Environment Variables

// *======= Socket server configuration =======
const io = require('socket.io')(server);

io.on('connection', () => {
	/* … */
});

// *======= Server listening =======
server.listen(process.env.PORT, () => {
	console.log(`Server online on port: ${process.env.PORT}`);
});
```

# Configuración de directorio publico

```javascript
// *======= Middlewares =======
app.use(express.static(__dirname + '/public')); // ? Directory Public
```

# Emitir del servidor al cliente y visceversa

### **Servidor:**

```javascript
io.on('connection', (socket) => {
	socket.emit('Mensaje-bienvenida', {
		msg: 'Bienvenido al server.',
		date: new Date(),
	});
});
```

### **Cliente:**

Nota: Se debe de utilizar la CDN de [socket.io](https://cdnjs.com/libraries/socket.io)

```javascript
const socket = io('http://localhost:8080');

socket.on('Mensaje-bienvenida', ({ msg, date }) => {
	console.log(`El servidor emitió: ${msg} - ${date}`);
});
```
