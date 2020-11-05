const Comment = require('../models/comment');

// Une class CommentService
class CommentService {
    constructor() { }

    async create(tweetId, comment) {
        const created = new Comment({
            user: comment.user,
            comment: comment.comment,
            createdAt: new Date(),
            tweetId: tweetId
        });

        await created.save();
        return created;
    }

    async getByTweetId(tweetId) {
        return Comment.find({ tweetId: tweetId }).sort({ createdAt: -1 });
    };
}

// on n'oublie pas d'exporter notre Service
module.exports = CommentService;