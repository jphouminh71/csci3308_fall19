const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    weight: {
      type: Number,
      required: false
    },
    height: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('User_Stats', statsSchema);
