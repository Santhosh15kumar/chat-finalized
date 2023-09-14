require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const server = http.createServer(app);

const initializeSocket = require('./socket.js');

app.use(express.json());

const options = {useNewUrlParser: true, useUnifiedTopology: true}

mongoose.connect(process.env.MONGO_URL, options);

mongoose.connection.on('connected', () => {
    console.log('Mongoose connection is connected');
});

mongoose.connection.on('error', (error) => {
    console.log('Mongoose connection has occured ' + error + ' error');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected');
});

process.on('SIGINT', () => {
    mongoose.connection.close( () => {
        console.log('Mongoose connection is disconnected due to application termination');
    });
});


const io = initializeSocket(server);

const useRoute = require('./routes/index.js');
app.use(useRoute);


server.listen(8080, () => {
    console.log("Server Running at http://localhost:8080");
});



