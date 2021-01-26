const express = require('express');
const bodyparser = require('body-parser');

const MessageFormatter = require('./src/MessageFormatter');
const SlackChannel = require('./src/SlackChannel');

const app = express();

const users = JSON.parse(process.env.USER_MAP);

const port = process.env.PORT || 9321;

app.use(bodyparser.json({ limit: '50mb' }));

app.post('/github-webhook', function(request, res) {
    try {
        const message = MessageFormatter.formatMessage(request.body, users);
        if (message) {
            SlackChannel.sendMessage(message);
        }
        res.send('');
    } catch (e) {
        console.log('ERROR', e);
    }
});

app.listen(port);
