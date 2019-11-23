const express = require('express');     // package to use express
const mongoose = require('mongoose');   // package to manipulate data in mongodb
const session = require('express-session');
require('dotenv').config();     // requirement for heroku
const app = express();
const path = require('path');
const uri = process.env.ATLAS_URI;      // either local host connect or .env which is for Heroku hosting
const methodOverride = require('method-override');

//use this instead of bodyparser setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: '123secretstring321'
}));

//use ejs as view engine
app.set('view engine', 'ejs');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})     // connects us to the database
                        .then((res) => {
                            console.log('success connecting to DB');
                        })
                        .catch((err) => {
                            console.log('error is ' + err);
                        });

//using static files such as images and css files
app.use('/static',express.static(path.join(__dirname, '../frontEnd/public'))); 
//using this path to go to api
app.use('/api', require('./routes/api'));
mongoose.set('useFindAndModify', false);
app.use(methodOverride('_method'));
//landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontEnd/views/index.html'));
});

app.listen(process.env.port || 5000, function(req, res) {       // listening to the port
    console.log('hello world');
});
