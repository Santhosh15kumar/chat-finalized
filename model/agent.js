const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    agentname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }

});

const agent = mongoose.model('Agent', schema);

module.exports = agent;