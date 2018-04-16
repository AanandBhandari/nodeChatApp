var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message.js');
describe('generateMessage', () => {
    it('should genetrate correct message object', () => {
        var from = 'jen';
        var text = 'Some message';
        var message = generateMessage(from,text);
        // expect(message.createdAt).toBe('number');
        expect(message).toInclude({from,text});   
    });
});
describe('generateLocationMessage', () => {
    it('should genetrate correct location object', () => {
         var from ='Me';
         var latitude =15;
         var longitude = 19;
         var url = 'https://www.google.com/maps?q=15,19';
         var message = generateLocationMessage(from, latitude,longitude);
         expect(message).toInclude({from,url}); 
    });
});