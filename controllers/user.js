const userModel = require('../model/user.js');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const server = require('../server.js');
const socketIo = require('socket.io');

class userController {
    async create(req, res){
        try{
            const {username, email, contactNo, service, allMessageData, onlineStatus} = req.body;
            const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            req.ipAddress = ipAddress;
            req.browserInfo = req.headers['user-agent'];
            const user = new userModel({
                username: username,
                email: email,
                contactNo: contactNo,
                service: service,
                allMessageData: allMessageData,
                onlineStatus: onlineStatus,
                clientIp: req.ipAddress,
                browserInfo: req.browserInfo
            });
            await user.save();
            console.log(user);
            return res.status(200).json({message: 'User created successfully', data: user, success:true});
        }catch(error){
            console.log("Error@create:", error);
            return res.status(400).send({status:400, success:false, message:error.message ? error.message : "Something went wrong"});
        }
    }

    async getAllUser(req,res){
        try{
            const users = await userModel.find();
            console.log(users);
            return res.status(200).json({message: 'All users details get successfully', data: users, success:true});
        }catch(error){
            console.log("Error@getAllUser:", error);
            return res.status(400).send({status:400, success:false, message:error.message ? error.message : "Something went wrong"});
        }
    }

    async getUserById(req,res){
        try{
            const user = await userModel.find({_id:req.params.id});
            console.log(user);
            return res.status(200).json({message: 'got user details', data: user, success:true});
        }catch(error){
            console.log("Error@getUserbyId:", error);
            return res.status(400).send({status:400, success:false, message:error.message ? error.message : "Something went wrong"});
        }
    }
    
    async changeOnlineStatus(req,res){
        try{
            const id  = req.params.id;
            const  onlineStatus  = req.body.onlineStatus;
            //console.log(typeof onlineStatus);
            //const user = await userModel.find({_id:req.params.id});
            //console.log(user);
            const updateUserField = await userModel.updateOne({_id:req.params.id}, {$set: {onlineStatus:onlineStatus}});
            //console.log(updateUserField);
            return res.status(200).json({message: 'changed Online status of the user', data: updateUserField, success:true});
        }catch(error){
            console.log("Error@changeOnlineStatus:", error);
            return res.status(400).send({status:400, success:false, message:error.message ? error.message : "Something went wrong"});
        }
    }

    async updateMessageArray(req,res){
        try{
            const  id  = req.params.id;
            const  messageArray  = req.body.messageArray;
            const updateUserField = await userModel.updateOne({_id: id}, {$set: {allMessageData: messageArray}});
            //console.log(updateUserField);
            return res.status(200).json({message: 'changed allMessageData of the user', data: updateUserField, success:true});
        }catch(error){
            console.log("Error@updateMessageArray:", error);
            return res.status(400).send({status:400, success:false, message:error.message ? error.message : "Something went wrong"}); 
        }
    }


}

module.exports = new userController();