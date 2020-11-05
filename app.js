// on récupére notre dépendance externe - ici express.
const express = require('express');
const logger = require('morgan');
const path = require('path');
const tweets = require('./tweets.json');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { response } = require('express');

// on construit notre application qui nous servira à créer nos routes
const app = express();
// on donne un port sur lequel notre serveur écoute
const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
// on indique que nos vues se trouverons toujours dans le dossier views 
app.set('views', path.join(__dirname, 'views'));

// notre première route !
// on envoi un Hello World si la requête est sur la racine.
app.get('/', (req, res) => {
    res.render('index', { name: 'TweetJs' });
});

app.get('/tweets/new', (req, res) => {
    res.render('new');
});

app.get('/tweets', (req, res) => {
    res.render('tweets', { tweets });
})

app.get('/tweets/:id', async (req, res) => {
    const id = req.params.id;

    // ici aussi on `await` bien la fonction asynchrone ! 
    const users = await getRandomUsers(3);

    const tweet = tweets.find((elem) => {
        return elem.id === id;
    });

    res.render('tweet', { tweet: tweet, users: users });
});

app.post('/tweets', (req, res) => {
    const tweet = req.body;
    tweet.id = uuidv4();
    tweets.push(tweet);
    res.redirect('/tweets');
});

// on écoute sur notre port.
app.listen(port, () => {
    console.log(`TweetJS listening at http://localhost:${port}`)
});


/**
* ma fonction prend en paramètre le nombre d'utilisateur qui sera généré.
* elle est asynchrone !
* @param number
* @return elle retourne un tableau d'utilisateurs
*/
async function getRandomUsers(number) {
    // je construis mon url avec le paramètre
    const url = `https://randomuser.me/api/?results=${number}`;

    let response;
    try {
        // on fait l'appel à l'API avec l'url. Toujours avec le `await`!
        response = await axios.get(url);
    } catch (err) {
        // on catch si il y a une erreur HTTP !
        // pas de réponse du serveur ! 
        if (!err.response) {
            console.error('Unknown error during the request');
            return [];
        }
        // on extrait de la réponse du serveur, le code, le body, et le status
        const { data, status, statusText } = err.response;
        console.error('Error during the request', status, statusText, data);

        // si j'ai une erreur je retourne un tableau vide ici
        return [];
    }

    // je récupére l'objet results de mon body
    const results = response.data.results;

    // ici je construis un nouveau tableau avec le même nombre d'élément que mon tableau.
    // je ne choisis de retourner que ce que j'ai besoin !
    const users = results.map(elem => {

        let politness = 'Monsieur';
        if (elem.gender === 'female') {
            politness = 'Madame';
        }

        return {
            politness: politness,
            firstName: elem.name.first,
            lastName: elem.name.last,
            email: elem.email,
        }
    });

    return users;
}