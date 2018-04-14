var socket = io();
socket.on('connect', () => {
    console.log('connected to the server');
    socket.emit('createMessage',{
        from: 'Aanand',
        text: 'yep.this works for me'
    });
});
socket.on('disconnect', ()=> {
    console.log('Disconnected from server');
});
socket.on('newMessage',function (newMessage) {
    console.log('newMessage',newMessage);
})

