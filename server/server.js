const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/user.js');
const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
app.use(express.static(publicPath));
io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.on('join', (params,callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
          return  callback('Name and Room name are required');
        }
        // socket.join('the office fans')
         // socket.leave('the office fans')
        // io.emit -> io.to('the office fans').emit
        // socket.broadcast.emit -> socket.broadcast.to('the office fans').emit
        // socket.emit
        socket.join(params.room);
        users.removeUser(socket.id); 
        users.addUser(socket.id,params.name,params.room);
        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));
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
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));

            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the room`));
        }
    });
});

server.listen(port,()=> {
    console.log(`Server is up on port ${port}`);
});