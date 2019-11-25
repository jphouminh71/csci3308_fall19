const User_food = require('../models/User_food.js'); //to track users food intake
const router = require('express').Router();

//Adds food to keep track of calories
router.post('/User_food', (req, res) =>{
  const{error} = registerValidation(req.body);
  if(error) //Erro couldn't find the user
  {
    return res.status(400).send(error.details[0].message);
  }
  const userexist = User_food.findOne({username: req.body.username});
  if(userexist)
  {
    console.log(req.body);
    User_food.create(req.body).then(function(User_food){
      res.redirect('/');
    }); // adds the food if the user exists
  }
});

module.exports = router;
