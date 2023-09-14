const socketIo = require('socket.io');

function initializeSocket(server){
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('A user Connected');

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return io;
}

module.exports = initializeSocket;