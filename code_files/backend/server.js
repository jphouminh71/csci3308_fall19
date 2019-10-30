const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const path = require('path');

const uri = process.env.ATLAS_URI;
// console.log(uri);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
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
    res.sendFile(path.join(__dirname, '../frontEnd/welcomepage.html'));
});


app.listen(process.env.port || 5000, function(req, res) {
    console.log('hello world');
});