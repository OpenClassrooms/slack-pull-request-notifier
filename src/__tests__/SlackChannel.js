jest.mock('request');
const request = require('request');
const SlackChannel = require('../SlackChannel');

test('SlackChannel.sendMessage should send POST request to an url defined in SLACK_WEBHOOK env var', () => {
    process.env = { SLACK_WEBHOOK: 'http://example.com/hook' };
    request.mockImplementation(jest.fn());
    SlackChannel.sendMessage('this is a test message');
    expect(request).toBeCalledWith({
        uri: 'http://example.com/hook',
        method: 'POST',
        json: {
           text: 'this is a test message',
        },
    });
});
