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
    }
});

const user = mongoose.model('Users', schema);
module.exports = user;