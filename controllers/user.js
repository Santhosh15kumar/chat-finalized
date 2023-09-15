const userModel = require('../model/user.js');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const server = require('../server.js');
const initializeSocket = require('../socket.js');
class userController {
    async create(req, res){
        try{
            const {username, email, contactNo, service} = req.body;
            
            const user = new userModel({
                username: username,
                email: email,
                contactNo: contactNo,
                service: service
            });
            await user.save();
            console.log(user);
            const io = initializeSocket(server);
            const chat = function(io) {
                io.on('connection', (socket) => {
                    console.log('A user connected to chat');
                    const roomName = user._id
                    socket.join(roomName);

                    socket.on("send_message", (message) => {
                        socket.to(roomName).emit("receive_message", message);
                    });

                    socket.on('disconnect', () => {
                        console.log("A user disconnected");
                    });
                });
            }
            chat(io);
            return res.status(200).json({message: 'User created successfully', data: user, success: true});
        }catch(error){
            console.log("Error@createUser:", error);
            return res.status(400).send({status:400, success:false, message:error.message ? error.message : "Something went wrong"});
        }
    }

    async getUserById(req,res){
        try{
            const user = await userModel.find({_id:req.params.id});
            console.log(user);
            return res.status(200).json({message: 'got user details', data: user});
        }catch(error){
            console.log("Error@getUserbyId:", error);
            return res.status(400).send({status:400, success:false, message:error.message ? error.message : "Something went wrong"});
        }
    }    
}

module.exports = new userController();