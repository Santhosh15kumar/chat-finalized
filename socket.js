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


         //   const chat = function(socket) {
          //          console.log('A user connected to chat');
         //           const roomName = user._id
           //         socket.join(roomName);
//
                //    socket.on("send_message", (message) => {
            //            socket.to(roomName).emit("receive_message", message);
                   // });
//
                  //  socket.on('disconnect', () => {
                  //      console.log("A user disconnected");
                  //  });
               // };
            //io.on('connection', chat);