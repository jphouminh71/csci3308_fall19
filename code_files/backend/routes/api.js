const router = require('express').Router();
const User = require('../models/User.js');      // returns the model of the collection of 'User' schema
const User_food = require('../models/User_food.js');
const User_Personal = require('../models/User_personal.js');
const User_Stats = require('../models/User_stats.js');
const { registerValidation, loginValidation } = require('./validation.js');
const path = require('path');
const verify = require('./verification');
var objid = require('mongoose').Types.ObjectId;


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
        User_Personal.create({_id: user._id, username: user.username}).then(function(personal_stats) {
            User_Stats.create({_id: user._id, username: user.username}).then(function(stats) {
                if (!req.session.username) {
                    req.session.username = user.username;
                }
                res.render(path.join(__dirname, '../../frontEnd/views/dashboard'), {user: user, self: personal_stats, stats: stats});
            });
        });
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
        const personal = await User_Personal.findById({_id: user._id});
        const stats = await User_Stats.findById({_id: user._id});

        if (!personal || !stats) res.status(200).send("Can't find personal info or stats");

        //initialize current session username
        console.log(req.session);
        if (!req.session.username) {
            req.session.username = req.body.username;
        }
        res.render(path.join(__dirname, '../../frontEnd/views/dashboard'), {user: user, self: personal, stats: stats});
    } else          // send error message
        return res.status(400).send('Username or Password is Incorrect');
});

router.get('/dashboard', verify, (req, res) => {
    findUser(req.session.username, function(err, user) {
        // console.log(user);
        if(req.query._method && req.query._method === 'put') {
            if (req.query.bio) {
                User_Personal.findOneAndUpdate({username: req.session.username}, {$set:{name: req.query.name, bio: req.query.bio}})
                .then(function(info) {
                    info.bio = req.query.bio;
                    info.name = req.query.name;
                    res.render('../../frontEnd/views/dashboard', {user: user, self: info});
                });
            } else if (req.query.height || req.query.weight || req.query.age || req.query.gender) {
                User_Stats.findOneAndUpdate({username: req.session.username}, {$set:{height: req.query.height, weight: req.query.weight, age: req.query.age, gender: req.query.gender}})
                .then(function(info){
                    info.height = req.query.height;
                    info.weight = req.query.weight;
                    info.age = req.query.age;
                    info.gender = req.query.gender;
                    res.render('../../frontEnd/views/dashboard', {user: user, stats: info});
                });
            } else {
                //edge case, fix here!
            }
            
        } else {
            User_Personal.findOne({username: user.username}).then(function(personal_stats) {
                res.render('../../frontEnd/views/dashboard', {user: user, self: personal_stats});
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
