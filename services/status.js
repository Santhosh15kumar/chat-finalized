module.exports = function(io, socket) {
    socket.on('status', (status) => {
        socket.to(status.clientname).emit('status',{status})
    });
}