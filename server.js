require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
module.exports = server;

const corsOptions = {
    origin: "http://localhost:4200",
    methods: ["GET","POST"],
}

app.use(express.json());
app.use(cors(corsOptions));

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


app.listen(8080, () => {
    console.log("Server Running at http://localhost:8080");
});



