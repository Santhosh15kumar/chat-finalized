module.exports = function(io, socket){
    socket.on('typing',(roomId) => {
        socket.to(roomId).emit('userTyping',{roomId})
    });
}