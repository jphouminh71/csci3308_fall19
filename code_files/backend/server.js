const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

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

app.listen(process.env.port || 5000, function() {
    console.log('hello world');
});