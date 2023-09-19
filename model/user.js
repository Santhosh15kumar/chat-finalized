const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                const emailRegex = /^[a-zA-Z0-9,_-]+@[a-zA-Z0-9,-]+\.[a-zA-Z]{2,4}$/;
                return emailRegex.test(email)
            },
            message: 'Invalid email format',
        },
        
    },
    contactNo: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function (contactNo) {
                const contactRegex = /^\d{10}$/;
                return contactRegex.test(contactNo);
            },
            message: 'phone number must have exactly 10 digits',
        },
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