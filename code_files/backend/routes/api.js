const router = require('express').Router();
const User = require('../models/User.js');      // returns the model of the collection of 'User' schema
const User_food = require('../models/User_food.js');
const { registerValidation, loginValidation } = require('./validation.js');

//get list of users - TA said this should work
router.get('/users', (req, res) => {
 const{error} = registerValidation(req.body);
  if(error)
    return res.status(400).send(error.details[0].message)
  const userExists = User.findOne({username: req.body.username})
  if(userExist)
    res.send(username);
  //   res.send({ {type: 'GET'});
});

router.get('/users/test', (req, res) => {
    //  const userExists = User.findOne({username: req.body.username})
    //  if(userExist)
    //    res.send(username);
       res.send( {type: 'GET'});
});

//add new user when they register
router.post('/register', async(req, res) => {

    const {error} = registerValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    // res.send({type: 'POST'});

    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist) return res.status(400).send('Email already exists');

    const userExist = await User.findOne({username: req.body.username});
    if (userExist) return res.status(400).send('User already exists');

    console.log(req.body);
    User.create(req.body).then(function(user) {   // if all is good we put this into the database
        res.redirect('/');      // redirect to homepage, need to change to dashboard
    });
});

// when a post request is sent from the client from signing it will fire this function
router.post('/signin', async(req, res) => {
    // const {error} = loginValidation(req.body);
    // if (error)
    //     return res.status(400).send(error.details[0].message);

    // const pw = await User.findOne({ email: req.body.password });
    const user = await User.findOne({ username: req.body.username });
    // console.log(req.body.username);
    if(user)        // if there is a user direct to the dashboard
        res.redirect('/dashboard.html');
    else          // send error message
        return res.status(400).send('Username or Password is Incorrect');

});

//remove user from db
router.delete('/users/:id', (req, res) => {
    console.log('Deleting: ' + req.params.id);
    User.findOneAndDelete({username: req.params.id}).then(function(user) {
        res.send('Deleted: ' + user);
    }).catch(err => res.status(400).send(err));
});

//update a user in db
router.put('/users:id', (req, res) => {
    res.send({type: 'PUT'});
});

module.exports = router;
