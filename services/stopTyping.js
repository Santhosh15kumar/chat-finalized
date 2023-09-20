module.exports = function(io, socket){
    socket.on('stopTyping', (roomId) => {
        socket.to(roomId).emit('userStoppedTyping',{roomId})
    });
}