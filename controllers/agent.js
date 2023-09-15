const agentModel = require('../model/agent.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const server = require('../server.js');
const initializeSocket = require('../socket.js');

class agentController {
    async register(req,res){
        try{
            const {agentname, email, password, role} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const agent = new agentModel({
              agentname: agentname,
              email: email,
              password: hashedPassword,
              role: role  
            });
            await agent.save();
            console.log(agent);
            return res.status(200).json({message: "agent Created Successfully", data: agent});
        }catch(error){
            console.log('Error@registeragent:',error);
            return res.status(400).send({status: 400, success: false, message: error.message ? error.message : "Something went wrong"});
        }
    };

    async login(req,res){
        try{
            const {email, password} = req.body;
            const agent = await agentModel.find({email: email});
            console.log(agent);
            const isPasswordMatched = await bcrypt.compare(password, agent[0].password);
            console.log(isPasswordMatched);
            if(isPasswordMatched){
                const jwtToken = jwt.sign({ agent: agent[0]._id }, 'MY_SECRET_TOKEN');
                console.log(jwtToken);
                const io = initializeSocket(server);
                const chat = function(io) {
                    io.on('connection', (socket) => {
                        console.log('A agent connected to chat');
                        const roomName = agent[0]._id
                        socket.join(roomName);
    
                        socket.on("send_message", (message) => {
                            socket.to(roomName).emit("receive_message", message);
                        });
    
                        socket.on('disconnect', () => {
                            console.log("An agent disconnected");
                        });
                    });
                }
                chat(io);
                return res.header('Authorization', `Bearer ${jwtToken}`).status(200).json({message: 'Agent Login Successfully'});
            }else{
                return res.status(404).json({message: error.message});
            }
        }catch(error){
            console.log('Error@loginagent:', error);
            return res.status(400).send({status: 400, success: false, message: error.message ? error.message : "Something went wrong"});
        }
    }

}

module.exports = new agentController();
