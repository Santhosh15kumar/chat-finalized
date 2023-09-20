const socketIo = require('socket.io');

function initializeSocketIo(server) {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('userjoin') = require('./services/clientJoin.js');
        socket.on('agentuserjoin') = require('./services/agentJoin.js');
        socket.on('message') = require('./services/sendMessage.js');
        socket.on('status') = require('./services/status.js');
        socket.on('typing') = require('./services/typing.js');
        socket.on('stopTyping') = require('./services/stopTyping.js');

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });

    });
}

module.exports = initializeSocketIo;
