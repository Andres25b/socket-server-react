// *======= DOM Ref =======
const socket = io('https://react-socket-server-jaha.herokuapp.com/');
const formulary = document.querySelector('#myForm');
const text = document.querySelector('#textMensaje');
const messages = document.querySelector('#myMsg');

// *======= Events =======
formulary.addEventListener('submit', (e) => {
	e.preventDefault();

	const msg = text.value;

	socket.emit('message-to-server', { msg });

	text.value = '';
});

// *======= Listening to server =======
socket.on('message-from-server', (data) => {
	messages.innerHTML += `<li class="list-group-item">${data.msg}</li>`;
});
