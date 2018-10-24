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
    console.log('New user connected:');

    //default username
    socket.username = "Player";

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
    socket.on('select_character', data => {
        socket.to(`${data.roomId}`).emit('select_character', { characterId: data.characterId });
    });

    //listen on unselect_character
    socket.on('unselect_character', data => {
        socket.to(`${data.roomId}`).emit('unselect_character');
    });

    //listen on user_connected
    socket.on('user_connected', () => {
        socket.broadcast.emit('user_connected', { username: socket.username });
    });

    socket.on('send_challenge', data => {
            if(io.sockets.clients().sockets[data.userId]){
                let challengerInfo = {
                    challengerName: io.sockets.clients().sockets[data.challengerId].username,
                    challengerId: data.challengerId
                }
                io.sockets.clients().sockets[data.userId].emit('send_challenge', challengerInfo);
            } else {
                let errorObject = {
                    errorType: 'user_not_found', 
                    event: 'send_challenge', 
                    msg: 'Error al intentar desafiar(Usuario no encontrado)'
                };
                socket.emit('handle_error', errorObject );
            }
    });

    socket.on('accept_challenge', data => {
        if(io.sockets.clients().sockets[data.challengerId]){
            let userId = data.userId;
            let challengerId = data.challengerId;
            let roomId = `${challengerId}${userId}`;
            
            io.sockets.clients().sockets[data.challengerId].emit('challenge_accepted', { userId });
            socket.emit('challenge_accepted', challengerId );

            io.sockets.clients().sockets[data.challengerId].join(roomId);
            socket.join(roomId);

            io.in(roomId).emit('join_room', { roomId });
        } else {
            let errorObject = {
                errorType: 'user_not_found', 
                event: 'send_challenge', 
                msg: 'Error al intentar desafiar(Usuario no encontrado)'
            };
            socket.emit('handle_error', errorObject );
        }
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.username}`);
    });
});
