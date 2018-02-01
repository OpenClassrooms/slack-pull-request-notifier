const MessageFormatter = require('../MessageFormatter');

describe('MessageFormatter.formatMessage should format message coming from github webhook request body', () => {
    const users = {
        JohnGithub: 'johnslack',
        ErikGithub: 'erikslack',
    };

    const pullRequestMetadata = {
        head: {
            repo: {
                name: 'OC',
                html_url: 'http://github.com/openclassrooms/OC'
            }
        },
        title: 'TICKET-123_foo',
        html_url: 'http://github.com/pr',
    };

    test('Review has been requested', () => {
        const requestBody = {
            action: 'review_requested',
            pull_request: {
                ...pullRequestMetadata,
                user: {
                    login: 'ErikGithub',
                },
            },
            requested_reviewer: {
                login: 'JohnGithub',
            },
        };
        expect(MessageFormatter.formatMessage(requestBody, users))
            .toBe('<@johnslack> PR from erikslack: <http://github.com/pr|TICKET-123_foo> on <http://github.com/openclassrooms/OC|OC> repo.');
    });

    test('Changes are requested on review', () => {
        const requestBody = {
            action: 'submitted',
            pull_request: {
                ...pullRequestMetadata,
                user: {
                    login: 'JohnGithub',
                },
            },
            review: {
                state: 'changes_requested',
                user: {
                    login: 'ErikGithub',
                }
            }
        };
        expect(MessageFormatter.formatMessage(requestBody, users))
            .toBe('<@johnslack> changes requested by erikslack: <http://github.com/pr|TICKET-123_foo> on <http://github.com/openclassrooms/OC|OC> repo. ');
    });

    test('Review has been approved', () => {
        const requestBody = {
            action: 'submitted',
            pull_request: {
                ...pullRequestMetadata,
                user: {
                    login: 'JohnGithub',
                },
            },
            review: {
                state: 'approved',
                user: {
                    login: 'ErikGithub',
                }
            }
        };
        expect(MessageFormatter.formatMessage(requestBody, users))
            .toBe('<@johnslack> changes approved by erikslack: <http://github.com/pr|TICKET-123_foo> on <http://github.com/openclassrooms/OC|OC> repo. :tada:');
    });
});
