const express = require('express');     // package to use express
const mongoose = require('mongoose');   // package to manipulate data in mongodb
require('dotenv').config();     // requirement for heroku
const app = express();
const path = require('path');

const uri = process.env.ATLAS_URI;      // either local host connect or .env which is for Heroku hosting
// console.log(uri);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})     // connects us to the database
                        .then((res) => {
                            console.log('success connecting to DB');
                        })
                        .catch((err) => {
                            console.log('error is ' + err);
                        });

//use ejs as view engine
app.set('view engine', 'ejs');

//use this instead of bodyparser setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//using static files such as images and css files
app.use(express.static(path.join(__dirname, '../frontEnd/public'))); 

//using this path to go to api
app.use('/api', require('./routes/api'));

//landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontEnd/views/index.html'));
});


app.listen(process.env.port || 5000, function(req, res) {       // listening to the port
    console.log('hello world');
});
