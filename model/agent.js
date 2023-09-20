const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    agentname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                const emailRegex = /^[a-zA-z0-9,_-]+@[a-zA-Z0-9,-]+\.[a-zA-Z]{2,4}$/;
                return emailRegex.test(email);
            },
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
          validator: function (password) {
            password  = password.trim();
            const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;
            const numberRegex = /[0-9]/;
            const letterRegex = /[a-zA-Z]/;
    
            return (
              specialCharRegex.test(password) &&
              numberRegex.test(password) &&
              letterRegex.test(password)
            );
          },
          message: 'Password must contain at least 1 special character, 1 number, and 1 letter',
        },
      },
    role: {
        type: String,
        required: true
    }

});

const agent = mongoose.model('Agent', schema);

module.exports = agent;