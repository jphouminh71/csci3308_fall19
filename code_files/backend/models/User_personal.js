const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false,
        max: 255,
        min: 2,
        default: ''
    },
    img_src: {
        type: String,
        required: false
    },
    bio: {
      type: String,
      required: false,
      max: 1000,
      default: 'Enter bio'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User_Personal', personSchema);
