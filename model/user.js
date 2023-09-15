const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
        
    },
    contactNo: {
        type: Number,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    allMessageData: {
        type: Array,
        required: true
    },
    onlineStatus: {
        type: String,
        required: true
    },
    clientIp: {
        type: String,
        required: true
    },
    browserInfo: {
        type: Object,
        required: true
    }
    
});

const user = mongoose.model('Users', schema);
module.exports = user;