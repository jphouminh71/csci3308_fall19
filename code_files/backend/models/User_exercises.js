 const mongoose = require('mongoose');

 const userExercisesSchema = new mongoose.Schema({
   pullUps: {
     type: String, //use this to seperate each user, if found then keep adding to this schema for their exercise max
   },
   bench:{
     type: Number,
   },
   squat:{
     type: Number,
   },
   deadlift:{
     type: Number,
   },
   military_press:{
     type: Number,
   },

 });
 module.exports = mongoose.model('User_exercises', userExercises);
