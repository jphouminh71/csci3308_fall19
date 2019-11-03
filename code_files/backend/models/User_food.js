const mongoose = require('mongoose');

const userFoodSchema = new mongoose.Schema({
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
  /*
  username:{ //to find the specific user
    type: String,
  },
  Food_name: { //Name of the food
    type: String,
    min:1,
  },
  calories: { //calorie of food
    type: Number,
    min:1,
  },
  date: {
      type: Date,
      default: Date.now
  }
  */
});
module.exports = mongoose.model('user_Food', userFoodSchema);
