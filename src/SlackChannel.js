const request = require('request');

function sendMessage(message) {
    const options = {
        uri: process.env.SLACK_WEBHOOK,
        method: 'POST',
        json: {
            text: message,
        }
    };
    request(options);
}

module.exports = {
    sendMessage,
};
