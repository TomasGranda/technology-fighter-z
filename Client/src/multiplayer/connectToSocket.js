import io from 'socket.io-client';
const connectToSocket = (ip) => {
    var socket = io((ip ? ip : null));
    socket.on("new_message", (data) => {
        console.log(data.message);
    });

    return socket;
};

export default connectToSocket;