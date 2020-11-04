// on récupére notre dépendance externe - ici express.
const express = require('express');
const logger = require('morgan');
const path = require('path');
const tweets = require('./tweets.json');
const { v4: uuidv4 } = require('uuid');


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

app.get('/tweets/:id', (req, res) => {
    const id = req.params.id;

    const tweet = tweets.find((elem) => {
        return elem.id === id;
    });

    res.render('tweet', { tweet: tweet });
});


app.get('/tweets', (req, res) => {

    req.query.id;

    res.render('tweets', { listOfTweets: tweets, name: 'TweetJS' });
});

app.get('/tweets/new', (req, res) => {
    res.render('new');
});

app.get('/tweets/:id', (req, res) => {
    const id = req.params.id;
    // id 

    res.render('tweet', { tweet: tweet })
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
