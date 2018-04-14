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
    socket.emit('newEmail',{
        from: 'socketemit@example.com',
        text: 'helloworld',
        createAt: 123
    });
    socket.on('createEmail',function (createEmail) {
        console.log('sent from the client', createEmail);
    });
    socket.on('disconnect', () =>{
        console.log('user was disconnected');
    });
});

server.listen(port,()=> {
    console.log(`Server is up on port ${port}`);
});