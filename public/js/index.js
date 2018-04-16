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
socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from} :`);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
});
jQuery('#message-form').on('submit',function (e) {
    e.preventDefault();
    socket.emit('createMessage',  {
        from : 'User',
        text : jQuery('#message').val()
    }, function () {
        
    });
});
var locationButton = jQuery('#send-location');
locationButton.on('click',function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage',{
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        })
    },function () {
        alert('unable to fetch location');
    });
});
