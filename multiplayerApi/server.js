const express = require('express');
const app = express();

const fightController = require('./routes/fightController');

app.use("/node", fightController);

const port = process.env.PORT || 5001;

server = app.listen(port, () => console.log(`Multiplayer Server running on port ${port}`));

//socket.io instantiation
const io = require("socket.io")(server);

//listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected');

    //default username
    socket.username = "Player";

    socket.on('get_users', () => {
        let users = [];
        for (let user in io.sockets.clients().sockets) {
            if (socket.id !== user) {
                users.push({
                    id: user, 
                    username: io.sockets.clients().sockets[user].username
                });
            }
        }
        socket.emit('get_users', { users: users });
    });

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username;
    });

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        console.log("emited new message " + data.message);
        io.sockets.emit('new_message', { message: data.message, username: socket.username });
    });

    //listen on typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { username: socket.username })
    });

    //listen on select_character
    socket.on('select_character', data => {
        socket.broadcast.emit('select_character', { characterId: data.characterId });
    });

    //listen on user_connected
    socket.on('user_connected', () => {
        socket.broadcast.emit('user_connected', { username: socket.username });
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.username}`);
    });
});
