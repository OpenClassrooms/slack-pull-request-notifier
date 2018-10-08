function getSlackUser(users, githubName, shouldGetId = false) {
    const user = users[githubName];

    if (typeof(user) === 'string') {
        return user;
    }

    if (shouldGetId) {
        return user.id;
    } else {
        return user.name;
    }
}

function formatMessage(body, users) {
    try {
        let reviewState;
        let reviewer;

        const author = body.pull_request.user.login;
        const pullRequestName = body.pull_request.title;
        const pullRequestUrl = body.pull_request.html_url;
        const repositoryName = body.pull_request.head.repo.name;
        const repositoryNameUrl = body.pull_request.head.repo.html_url;

        switch (body.action) {
            case 'review_requested':
                const requestedReviewer = body.requested_reviewer.login;
                return `<@${getSlackUser(users, requestedReviewer, true)}> PR from ${getSlackUser(users, author)}: <${pullRequestUrl}|${pullRequestName}> on <${repositoryNameUrl}|${repositoryName}> repo.`;
            case 'submitted':
                reviewState = body.review.state;
                reviewer = body.review.user.login;

                if (reviewState !== 'changes_requested' && reviewState !== 'approved') {
                    break;
                }

                const reviewAction = reviewState === 'approved' ? 'approved' : 'requested';
                const emoji = reviewState === 'approved' ? ':tada:' : '';

                return `<@${getSlackUser(users, author, true)}> changes ${reviewAction} by ${getSlackUser(users, reviewer)}: <${pullRequestUrl}|${pullRequestName}> on <${repositoryNameUrl}|${repositoryName}> repo. ${emoji}`;
            default:
                return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    formatMessage,
};
