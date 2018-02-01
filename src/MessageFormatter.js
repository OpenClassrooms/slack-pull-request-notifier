function formatMessage(body, users) {
    try {
        let reviewState;
        let reviewer;

        const author = body.pull_request.user.login;
        const pullRequestName = body.pull_request.title;
        const pullRequestUrl = body.pull_request.html_url;
        const repositoryName = body.pull_request.head.repo.name;
        const repositoryNameUrl = body.pull_request.head.repo.html_url;

        if (body.action === 'review_requested') {
            const requestedReviewer = body.requested_reviewer.login;
            return `<@${users[requestedReviewer]}> PR from ${users[author]}: <${pullRequestUrl}|${pullRequestName}> on <${repositoryNameUrl}|${repositoryName}> repo.`;
        }

        if (body.action === 'submitted') {
            reviewState = body.review.state;
            reviewer = body.review.user.login;
        }

        if (body.action === 'submitted' && reviewState === 'changes_requested') {
            return `<@${users[author]}> changes requested by ${users[reviewer]}: <${pullRequestUrl}|${pullRequestName}> on <${repositoryNameUrl}|${repositoryName}> repo.`;
        }

        if (body.action === 'submitted' && reviewState === 'approved') {
            return `<@${users[author]}> changes approved by ${users[reviewer]}: <${pullRequestUrl}|${pullRequestName}> on <${repositoryNameUrl}|${repositoryName}> repo. :tada:`;
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    formatMessage,
};
