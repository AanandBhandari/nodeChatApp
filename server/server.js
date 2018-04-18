const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));
    socket.on('join', (params,callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and Room name are required');
        }
        callback();
    });
    socket.on('createMessage',(createMessage,callback) => {
        console.log('createMessage',createMessage);
        io.emit('newMessage',generateMessage(createMessage.from,createMessage.text)
          
        // {
        //     from: createMessage.from,
        //     text: createMessage.text,
        //     createdAt: new Date().getTime() 
        // }
          
    );
    callback(); 
    });
    socket.on('createLocationMessage',(coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude));
    });
    socket.on('disconnect', () =>{
        console.log('user was disconnected');
    });
});

server.listen(port,()=> {
    console.log(`Server is up on port ${port}`);
});