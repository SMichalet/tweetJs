const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const commentSchema = new Schema({
    user: String,
    comment: String,
    createdAt: Date,
    tweetId: ObjectId // je met ici l'ObjectId de notre tweetId
});

module.exports = mongoose.model('comment', commentSchema);