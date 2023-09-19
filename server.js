require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer("http://localhost:3001");
const socketIo = require('socket.io');
const io = socketIo(server);


app.use(express.json());
app.use(express.static('public'));
app.use(cors());

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


const useRoute = require('./routes/index.js');
app.use(useRoute);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnected', () => {
        console.log('A user disconnected');
    });
});


app.listen(8080, () => {
    console.log("Server Running at http://localhost:8080");
});



