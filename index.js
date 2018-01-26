const request = require('request');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();

const users = JSON.parse(process.env.USER_MAP);

app.use(bodyparser.json({ limit: '50mb' }));

app.post('/github-webhook', function(req, res) {
    try {
        const body = req.body;

        let reviewState;
        let reviewer;

        const author = body.pull_request.user.login;
        const pullRequestName = body.pull_request.title;
        const pullRequestUrl = body.pull_request.html_url;
        const repositoryName = body.pull_request.head.repo.name;
        const repositoryNameUrl = body.pull_request.head.repo.html_url;

        if (body.action === 'review_requested') {
            const requestedReviewer = body.requested_reviewer.login;
            sendMessageToSlackChannel(`<@${users[requestedReviewer]}> PR from ${users[author]}: <${pullRequestUrl}|${pullRequestName}> on <${repositoryNameUrl}|${repositoryName}> repo.`);
        }

        if (body.action === 'submitted') {
            reviewState = body.review.state;
            reviewer = body.review.user.login;
        }

        if (body.action === 'submitted' && reviewState === 'changes_requested') {
            sendMessageToSlackChannel(`<@${users[author]}> changes requested by ${users[reviewer]}: <${pullRequestUrl}|${pullRequestName}> on <${repositoryNameUrl}|${repositoryName}> repo.`);
        }

        if (body.action === 'submitted' && reviewState === 'approved') {
            sendMessageToSlackChannel(`<@${users[author]}> changes approved by ${users[reviewer]}: <${pullRequestUrl}|${pullRequestName}> on <${repositoryNameUrl}|${repositoryName}> repo. :tada:`);
        }

        res.send('');
    } catch (error) {
        console.log(error);
        res.send('');
    }
});

app.listen(9321);

function sendMessageToSlackChannel(message) {
    const options = {
        uri: process.env.SLACK_WEBHOOK,
        method: 'POST',
        json: {
            "text": message
        }
    };
    request(options);
}
