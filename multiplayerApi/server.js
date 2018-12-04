const express = require('express');
const getSelections = require('./utils/getSelections');
const clearSelections = require('./utils/cleanSelections');
const app = express();

const fightController = require('./routes/fightController');

app.use("/node", fightController);

const port = process.env.PORT || 5001;

server = app.listen(port, () => console.log(`Multiplayer Server running on port ${port}`));

//socket.io instantiation
const io = require("socket.io")(server);

//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected:');

	//default username
	socket.username = "Player";

	let users = [];
	for (let user in io.sockets.clients().sockets) {
		if (socket.id !== user) {
			users.push({
				socketId: socket.id,
				id: user,
				username: io.sockets.clients().sockets[user].username
			});
		}
	}
	socket.emit('get_users', { users: users });

	socket.on('get_users', () => {
		let users = [];
		for (let user in io.sockets.clients().sockets) {
			if (socket.id !== user) {
				users.push({
					socketId: socket.id,
					id: user,
					username: io.sockets.clients().sockets[user].username
				});
			}
		}
		socket.emit('get_users', { users: users });
	});

	//listen on change_username
	socket.on('change_username', (data) => {
		console.log(data.username)
		socket.username = data.username;
	});

	//listen on new_message
	socket.on('new_message', (data) => {
		//broadcast the new message
		console.log("emited new message " + data.message);
		io.sockets.emit('new_message', { message: data.message, username: socket.username });
	});

	//listen on typing
	socket.on('typing', () => {
		socket.broadcast.emit('typing', { username: socket.username })
	});

	//listen on select_character
	socket.on('select_character', async (data) => {
		socket.to(data.roomId).emit('select_character', { characterId: data.characterId });
		socket.select = data.characterId;
		const selections = await getSelections(io, data.roomId);
		if (selections.length > 1) {
			io.in(data.roomId).emit('start_countdown');
			await clearSelections(io, data.roomId);
		} else {
			io.in(data.roomId).emit('stop_countdown');
		}
	});

	socket.on('rematch', async (data) => {
		if(!io.sockets.adapter.rooms[data.roomId].rematch) io.sockets.adapter.rooms[data.roomId].rematch = 0;
		io.sockets.adapter.rooms[data.roomId].rematch++;
		if(io.sockets.adapter.rooms[data.roomId].rematch === 2){
			io.in(data.roomId).emit('rematch_success');
			io.sockets.adapter.rooms[data.roomId].rematch = 0;
		}
	});

	socket.on('change_characters', async (data) => {
		if(!io.sockets.adapter.rooms[data.roomId].changeCharacters) io.sockets.adapter.rooms[data.roomId].changeCharacters = 0;
		io.sockets.adapter.rooms[data.roomId].changeCharacters++;
		if(io.sockets.adapter.rooms[data.roomId].changeCharacters === 2){
			io.in(data.roomId).emit('change_characters_success');
			io.sockets.adapter.rooms[data.roomId].changeCharacters = 0;
		}
	});

	//listen on unselect_character
	socket.on('unselect_character', data => {
		socket.to(data.roomId).emit('unselect_character');
		socket.select = "";
		io.in(data.roomId).emit('stop_countdown', { characterId: data.characterId });
	});

	//listen on user_connected
	socket.on('user_connected', () => {
		socket.broadcast.emit('user_connected', { username: socket.username });
	});

	socket.on('make_action', (data) => {
		socket.to(data.roomId).emit('enemy_action', { action: data.action });
	});

	socket.on('send_challenge', data => {
		if (io.sockets.clients().sockets[data.userId]) {
			let challengerInfo = {
				challengerName: io.sockets.clients().sockets[data.challengerId].username,
				challengerId: data.challengerId
			}
			io.sockets.clients().sockets[data.userId].emit('send_challenge', challengerInfo);
		} else {
			let errorObject = {
				errorType: 'user_not_found',
				event: 'send_challenge',
				msg: 'Error al intentar desafiar(Usuario no encontrado)',
				data: {
					userId: data.userId
				}
			};
			socket.emit('handle_error', errorObject);
		}
	});

	socket.on('accept_challenge', data => {
		if (io.sockets.clients().sockets[data.challengerId]) {
			let userId = data.userId;
			let challengerId = data.challengerId;
			let roomId = `${challengerId}${userId}`;

			io.sockets.clients().sockets[data.challengerId].emit('challenge_accepted', { userId });
			socket.emit('challenge_accepted', challengerId);

			io.sockets.clients().sockets[data.challengerId].join(roomId);
			socket.join(roomId);
			io.sockets.adapter.rooms[roomId].countdown = 0;
			io.in(roomId).emit('join_room', { roomId });
		} else {
			let errorObject = {
				errorType: 'user_not_found',
				event: 'accept_challenge',
				msg: 'Error al intentar aceptar desafio (Usuario no encontrado)',
				data: {
					userId: challengerId
				}
			};
			socket.emit('handle_error', errorObject);
		}
	});

	socket.on('countdown_complete', (data) => {
		io.sockets.adapter.rooms[data.roomId].countdown++
		if (io.sockets.adapter.rooms[data.roomId].countdown === 2) {
			io.in(data.roomId).emit('fight_init');
			io.sockets.adapter.rooms[data.roomId].countdown = 0;
		}
	});

	socket.on('disconnect', () => {
		console.log(`User disconnected: ${socket.username}`);
	});
});
