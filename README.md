# Slack pull request notifier

## What is it?

This is a Slackbot written in Node.js that posts channel notifications to ping people when they are added as reviewers to a pull request, when changes are requested, and when those changes are approved.

![Illustration image](https://github.com/OpenClassrooms/slack-pull-request-notifier/blob/master/github-pull-request.png "Illustration image")

## How is it used?

First, you have to create a [new Slack application](https://api.slack.com/apps), then go to `Add features and functionality > Incoming Webhooks` and click on `Add New Webhook to Workspace`.

You must properly set the following environment variables:

`PORT` - Port of the http server. (Optional) (Default port is 9321) 

`SLACK_WEBHOOK` - your Slack webhook URL

Example: `https://hooks.slack.com/services/foo/bar/foobar123`

`USER_MAP` - nickname mapping from GitHub to Slack

Example:

    {
        "Mystraht": "john",
        "Ayunn": "richard",
    }
    
The keys (ex. "Mystraht") correspond to GitHub nicknames, and the values (ex. "John") correspond to Slack nicknames.

You can then launch the Node server by running:

    npm install
    npm run start

You will then have to configure your GitHub webhook.

Go to your repository settings, and add a webhook with the following configuration:

    Payload URL: http://<YOUR_DOMAIN>:9321/github-webhook
    Content type: application/json
    Event: Let me select individual events.
        -> Pull request
        -> Pull request review comment
        -> Pull request review

## Contributing

Feel free to submit a pull request!
