module.exports = function (io,socket) {
    socket.on('message', (message) => {
        console.log('Received message:',message);
        socket.to(message.id).emit('message',{name:message.name,message:message.message});
    });
}