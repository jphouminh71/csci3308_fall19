const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false,
        max: 255,
        min: 2
    },
    img_src: {
        type: String,
        required: false
    },
    bio: {
      type: String,
      required: false,
      max: 1000
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User_Personal', personSchema);
