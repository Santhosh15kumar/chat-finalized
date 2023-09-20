module.exports = function(io, socket){
    socket.on('agentuserjoin', (agentnamedata) => {
        console.log(agentnamedata.clientname);
        console.log(agentnamedata.agentname);

        socket.join(`${agentnamedata.clientname}`);
        console.log(`Agent ${agentnamedata.agentname} joined the room: ${ agentnamedata.clientname}`);
        socket.to( agentnamedata.clientname).emit('userjoin',{name:agentnamedata.agentname,onlinestatusage:agentnamedata.onlinestatusage});
    });
}