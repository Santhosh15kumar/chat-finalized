const socketIo = require('socket.io');

function initializeSocketIo(server) {
    const io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Authorization'],
            credentials: true
          }
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('userjoin', (data) => {
            console.log(data.name)
            socket.join(`${data.id}`);
            console.log(`Client ${data.name} joined the room: ${data.id}`);
            socket.to(data.id).emit('userjoin',{name:data.name});
        });


        socket.on('agentuserjoin', (agentnamedata) => {
        console.log(agentnamedata.clientname);
        console.log(agentnamedata.agentname);

        socket.join(`${agentnamedata.clientname}`);
        console.log(`Agent ${agentnamedata.agentname} joined the room: ${ agentnamedata.clientname}`);
        socket.to( agentnamedata.clientname).emit('userjoin',{name:agentnamedata.agentname,onlinestatusage:agentnamedata.onlinestatusage});
        });
        
        socket.on('message', (message) => {
            console.log('Received message:',message);
            socket.to(message.id).emit('message',{name:message.name,message:message.message});
        });

        socket.on('status', (status) => {
            socket.to(status.clientname).emit('status',{status})
        });

        socket.on('typing',(roomId) => {
            socket.to(roomId).emit('userTyping',{roomId})
        });

        socket.on('stopTyping', (roomId) => {
            socket.to(roomId).emit('userStoppedTyping',{roomId})
        });


        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });

    });
}

module.exports = initializeSocketIo;
