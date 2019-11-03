const mongoose = require('mongoose');

const userFoodSchema = new mongoose.Schema({
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
});
module.exports = mongoose.model('User_food', userFoodSchema);
