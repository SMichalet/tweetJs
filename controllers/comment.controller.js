const CommentService = require('../services/comment.service');

class CommentController {
    constructor() {
        // on créé une nouvelle instance de CommentService que l'on ajoute à notre attribut
        this.commentService = new CommentService();
    }

    async create(req, res) {
        const comment = req.body;
        const tweetId = req.params.id;

        // on fera la vérification de l'existence du tweet en Exercice

        const created = await this.commentService.create(tweetId, comment);
        res.send(created);
    }

    async getByTweetId(req, res) {
        const tweetId = req.params.id;

        // on fera la vérification de l'existence du tweet en Exercice

        const comments = await this.commentService.getByTweetId(tweetId);
        res.send(comments);
    }
}

// on n'oublie pas d'exporter notre Controller
module.exports = CommentController;