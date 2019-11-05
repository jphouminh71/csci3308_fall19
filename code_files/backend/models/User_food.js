const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({

  day: {
    type: String,
    required: [true, 'must enter day']
  },

  caloricIntake : {
    type: Number,
    required: [true, 'caloric intake field required']
  },

  dailyTotal : {
    type : Number,
    required: [true, 'caloric intake field required']
  }
});
module.exports = mongoose.model('User_Food', foodSchema);
