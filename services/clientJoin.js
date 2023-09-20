module.exports = function(io,socket) {
    socket.on('userjoin', (data) => {
        console.log(data.name)
        socket.join(`${data.id}`);
        console.log(`Client ${data.name} joined the room: ${data.id}`);
        socket.to(data.id).emit('userjoin',{name:data.name});
    })
}