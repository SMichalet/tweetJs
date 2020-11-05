const express = require('express');
const CommentController = require('../controllers/comment.controller');

// on créé une nouvelle instance de notre controller !
const commentController = new CommentController();
// on spécifie le router express
const router = express.Router();

// On définis nos routes 
router.post('/api/tweets/:id/comments', async (req, res) => {
    await commentController.create(req, res);
});

router.get('/api/tweets/:id/comments', async function (req, res) {
    commentController.getByTweetId(req, res);
});

// ici pas de classe, on export directement l'objet route
module.exports = router;