const express = require('express');
const socketIO = require('socket.io');
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
    socket.emit('newMessage',{
        from: 'Andrew',
        text: 'helloworld',
        createdAt: 12342
    });
    socket.on('createMessage',(createMessage) => {
        console.log('createMessage',createMessage);
    });
    socket.on('disconnect', () =>{
        console.log('user was disconnected');
    });
});

server.listen(port,()=> {
    console.log(`Server is up on port ${port}`);
});