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

//use this instead of bodyparser setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', require('./routes/api'));
app.use(express.static(path.join(__dirname, '../frontEnd'))); 


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontEnd/index.html'));
});


app.listen(process.env.port || 5000, function(req, res) {       // listening to the port
    console.log('hello world');
});
