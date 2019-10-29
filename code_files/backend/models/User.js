const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    },
    height: {
      type: String,
      required: false, //for now
      max: 10,
      min: 2
    },
    weight: {
      type: String,
      required: false, //for now
      max: 4,
      min: 2
    }
});

module.exports = mongoose.model('User', userSchema);
