const router = require('express').Router();
const User = require('../models/User.js');      // returns the model of the collection of 'User' schema
const User_food = require('../models/User_food.js');
const User_Personal = require('../models/User_personal.js');
const { registerValidation, loginValidation } = require('./validation.js');
const path = require('path');
const verify = require('./verification');


findUser = function findUser(name, callback){
    User.findOne({username: name}, function(err, userObj){
        if(err){
            return callback(err);
        } else if (userObj){
            return callback(null,userObj);
        } else {
            return callback();
        }
    });
}

//get list of users - TA said this should work
router.get('/users', (req, res) => {
 const{error} = registerValidation(req.body);
  if(error)
    return res.status(400).send(error.details[0].message)
  const userExists = User.findOne({username: req.body.username})
  if(userExist)
    res.send(username);
});

//add new user when they register
router.post('/register', async(req, res) => {

    const {error} = registerValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist) return res.status(400).send('Email already exists');

    const userExist = await User.findOne({username: req.body.username});
    if (userExist) return res.status(400).send('User already exists');

    User.create(req.body).then(function(user) {   // if all is good we put this into the database
        res.redirect('/');      // redirect to homepage, need to change to dashboard
    });
});

//go to login page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/views/login.html'));
});

// when a post request is sent from the client from signing it will fire this function
router.post('/signin', async(req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if(user) {       // if there is a user direct to the dashboard
        const personal = await User_Personal.findOne({user_id: req.body._id});
        
        if (!req.session.username) {
            req.session.username = req.body.username;
        }
        if (personal) {
            res.render(path.join(__dirname, '../../frontEnd/views/dashboard'), {user: user, self: personal});
        } else {
            User_Personal.create({_id: user._id, username: user.username}).then(function(personal_stats) {
            res.render('../../frontEnd/views/dashboard', {person: user, self: personal_stats});
        });
    }
}   else          // send error message
        return res.status(400).send('Username or Password is Incorrect');
});

router.get('/dashboard', verify, (req, res) => {
    findUser(req.session.username, function(err, user) {

        if(req.query._method && req.query._method === 'put') {
            User_Personal.findOneAndUpdate({username: req.session.username}, {$set:{bio: req.query.bio}})
            .then(function(info) {
                info.bio = req.query.bio;
                res.render('../../frontEnd/views/dashboard', {user: user, self: info});
            });
        } else {
            User_Personal.findOne(user._id).then(function(personal_stats) {
                res.render('../../frontEnd/views/dashboard', {person: user, self: personal_stats});
            });
        }
    });
});

//remove user from db
router.delete('/users/:id', (req, res) => {
    console.log('Deleting: ' + req.params.id);
    User.findOneAndDelete({username: req.params.id}).then(function(user) {
        res.send('Deleted: ' + user);
    }).catch(err => res.status(400).send(err));
});

//update a user in db
// router.put('/users:id', (req, res) => {
//     res.send({type: 'PUT'});
// });

module.exports = router;
