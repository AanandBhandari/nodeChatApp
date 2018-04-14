var socket = io();
socket.on('connect', () => {
    console.log('connected to the server');
    socket.emit('createEmail',{
        to: 'clientsocketemit@example.com',
        text: 'helloworld',
        createAt: 123
    });
});
socket.on('disconnect', ()=> {
    console.log('Disconnected from server');
});
socket.on('newEmail', function (newEmail) {
   console.log('new Email',newEmail); 
});

