# Slack pull request notifier

## What is it?

This is a slack bot writted in node.js that notify people when new pull request review is awaiting for them. 

## How to use it?

First, you have to create a [new slack application](https://api.slack.com/apps), then go to `Add features and functionality > Incoming Webhooks` and finally click on  		`Add New Webhook to Workspace`

After that, you have to properly set following environment variables :

`SLACK_WEBHOOK` - your slack webhook url

Example : `https://hooks.slack.com/services/foo/bar/foobar123`

`USER_MAP` - nickname mapping from github to slack

Example :

    {
        "Mystraht": "john",
        "Ayunn": "richard",
    }
    
Keys (ex: Mystraht) is for your github nickname and values (ex: John) is for your slack nickname.

Then you have to launch node server by typing :

    npm install
    npm run start

Then you have to configure your Github webhook.

Go to your repository settings and add webhook with following configuration :

    Payload URL: http://<YOUR_DOMAIN>:9321/github-webhook
    Content type: application/json
    Event: Let me select individual events.
        -> Pull request
        -> Pull request review comment
        -> Pull request review

## Contributing

Feel free to make pull request!
