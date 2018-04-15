var socket = io();
socket.on('connect', () => {
    console.log('connected to the server');
    
});
socket.on('disconnect', ()=> {
    console.log('Disconnected from server');
});
socket.on('newMessage',function (newMessage) {
    console.log('newMessage',newMessage);
});
socket.emit('createMessage', {
    from : 'bunu',
    text : 'Hi'
}, function (data) {
    console.log('got it',data);
});
