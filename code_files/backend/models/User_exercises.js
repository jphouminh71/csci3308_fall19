 const mongoose = require('mongoose');

 const userExercisesSchema = new mongoose.Schema({
   username: {
     type: String, //use this to seperate each user, if found then keep adding to this schema for their exercise max
   },
   Bench:{
     type: Number,
   },
   Squat:{
     type: Number,
   },
   Deadlift:{
     type: Number,
   },
   MilitaryPress:{
     type: Number,
   },

 });
 module.exports = mongoose.model('User_exercises', userExercises);
