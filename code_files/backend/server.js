const express = require('express');     // package to use express
const mongoose = require('mongoose');   // package to manipulate data in mongodb
require('dotenv').config();     // requirement for heroku
const app = express();
const path = require('path');

const uri = process.env.ATLAS_URI;      // either local host connect or .env which is for Heroku hosting

//use this instead of bodyparser setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
// app.use(express.static(path.join(__dirname, '../frontEnd/views')))

//using this path to go to api
app.use('/api', require('./routes/api'));

//landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontEnd/views/index.html'));
});

// console.log(uri);


app.listen(process.env.port || 5000, function(req, res) {       // listening to the port
    console.log('hello world');
});
