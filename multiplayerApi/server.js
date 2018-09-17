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
	socket.username = "Anonymous";

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    });

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        console.log("emited new message " + data.message);
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    });

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.username}`);
    });
});
