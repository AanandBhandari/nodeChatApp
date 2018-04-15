var expect = require('expect');
var {generateMessage} = require('./message.js');
describe('generateMessage', () => {
    it('should genetrate correct message object', () => {
        var from = 'jen';
        var text = 'Some message';
        var message = generateMessage(from,text);
        // expect(message.createdAt).toBe('number');
        expect(message).toInclude({from,text});   
    });
});