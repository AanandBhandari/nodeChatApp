var socket = io();
socket.on('connect', () => {
    console.log('connected to the server');
    
});
socket.on('disconnect', ()=> {
    console.log('Disconnected from server');
});
socket.on('newMessage',function (newMessage) {
    // console.log('newMessage',newMessage);
    var formattedTime = moment(newMessage.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);
    // jQuery('#messages').append(li);
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        text : newMessage.text,
        from : newMessage.from,
        createdAt : formattedTime
    });
    jQuery('#messages').append(html);
});
socket.emit('createMessage', {
    from : 'bunu',
    text : 'Hi'
}, function (data) {
    console.log('got it',data);
}); 
socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');
    // li.text(`${message.from} ${formattedTime}:`);
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        from : message.from,
        createdAt: formattedTime,
        url : message.url
    });
    jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit',function (e) {
    e.preventDefault();
    var messageTextBox = jQuery('#message');
    socket.emit('createMessage',  {
        from : 'User',
        text : messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });
});
var locationButton = jQuery('#send-location');
locationButton.on('click',function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    locationButton.attr('disabled','disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage',{
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        })
    },function () {
        alert('unable to fetch location');
        locationButton.removeAttr('disabled').text('Send Location');
    });
});
