const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// le schéma structure le document que l'on va utiliser sur notre projet
// on y définit les champs et les types !!
const tweetSchema = new Schema({
    user: String,
    title: String,
    content: String,
    createdAt: Date, // on ajoute ici une date de création !
});

// on créé un model de notre tweet (attention la collection doit être égal au nom de notre model au pluriel !!)
module.exports = mongoose.model('tweet', tweetSchema);