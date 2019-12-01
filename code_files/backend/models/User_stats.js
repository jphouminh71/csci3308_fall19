const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false,
        default: 99
    },
    gender: {
        type: String,
        required: false,
        default: "n/a"
    },
    weight: {
      type: Number,
      required: false,
      default: 0
    },
    height: {
        type: Number,
        required: false,
        default: 0
    },
    weightGoal: {
        type: Number,
        required: false,
        default: 1000
    },
    bench: {
        type: Number,
        required: false,
        default: 0
    }
});

module.exports = mongoose.model('User_Stats', statsSchema);
