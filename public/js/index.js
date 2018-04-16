var socket = io();
socket.on('connect', () => {
    console.log('connected to the server');
    
});
socket.on('disconnect', ()=> {
    console.log('Disconnected from server');
});
socket.on('newMessage',function (newMessage) {
    console.log('newMessage',newMessage);
    var li = jQuery('<li></li>');
    li.text(`${newMessage.from}: ${newMessage.text}`);
    jQuery('#messages').append(li);
});
socket.emit('createMessage', {
    from : 'bunu',
    text : 'Hi'
}, function (data) {
    console.log('got it',data);
});
jQuery('#message-form').on('submit',function (e) {
    e.preventDefault();
    socket.emit('createMessage',  {
        from : 'User',
        text : jQuery('#message').val()
    }, function () {
        
    });
});
