const router = require('express').Router();
const User = require('../models/User.js');      // returns the model of the collection of 'User' schema
const User_food = require('../models/User_food.js');
const User_Personal = require('../models/User_personal.js');
const User_Stats = require('../models/User_stats.js');
const { registerValidation, loginValidation } = require('./validation.js');
const path = require('path');
const multer = require('multer');
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

findPersonal = function findPersonal(name, callback) {
    User_Personal.findOne({username: name}, function(err, userObj) {
        if(err) {
            return callback(err);
        } else if (userObj) {
            return callback(null, userObj);
        } else {
            return callback();
        }
    });
}

findStats = function findStats(name, callback) {
    User_Stats.findOne({username: name}, function(err, userObj) {
        if(err) {
            return callback(err);
        } else if (userObj) {
            return callback(null, userObj);
        } else {
            return callback();
        }
    });
}

var storage = multer.diskStorage({
    // define where the file should be uploaded, else it will be uploaded to the system temp dir
    destination: function (req, file, callback) {
      callback(null, path.join(__dirname, '../frontEnd/public/uploads/'))
    },
    // define "filename", else a random name will be used for the uploaded file
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + file.originalname + '-' + req.session.username + '-' + '-' + Date.now())
    }
  });

var upload = multer({ storage: storage });

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
                res.render(path.join(__dirname, '../frontEnd/views/dashboard'), {user: user, self: personal_stats, stats: stats});
            });
        });
    });
});

//go to login page
router.get('/login', (req, res) => {
    if (req.session.username) {
        findUser(req.session.username, function(err, user) {
            findPersonal(req.session.username, function(err, personal_stats){
                findStats(req.session.username, function(err, stats){
                    res.render(path.join(__dirname, '../frontEnd/views/dashboard'), {user: user, self: personal_stats, stats: stats});
                });
            });
        });
    } else {
        res.sendFile(path.join(__dirname, '../frontEnd/views/login.html'));
    }
});

router.get('/signin', (req, res) => {
    if (req.session.username){
        findUser(req.session.username, function(err, user){
            findPersonal(req.session.username, function(err, personal_stats){
                findStats(req.session.username, function(err, stats){
                    res.render(path.join(__dirname, '../frontEnd/views/dashboard'), {user: user, self: personal_stats, stats: stats});
                });
            });
        });
    } else {
        res.redirect('/');
    }
});

// when a post request is sent from the client from signing it will fire this function
router.post('/signin', async(req, res) => {
    if (req.session.username) {
        findUser(req.session.username, function(err, user) {
            findPersonal(req.session.username, function(err, personal_stats){
                findStats(req.session.username, function(err, stats){
                    res.render(path.join(__dirname, '../frontEnd/views/dashboard'), {user: user, self: personal_stats, stats: stats});
                });
            });
        });
    } else {
        const user = await User.findOne({ username: req.body.username });
        if(user) {       // if there is a user direct to the dashboard
        const personal = await User_Personal.findById({_id: user._id});
        const stats = await User_Stats.findById({_id: user._id});

        if (!personal || !stats) res.status(200).send("Can't find personal info or stats");

        //initialize current session username
        if (!req.session.username) {
            req.session.username = req.body.username;
        }
        res.render(path.join(__dirname, '../frontEnd/views/dashboard'), {user: user, self: personal, stats: stats});
        } else          // send error message
            return res.status(400).send('Username or Password is Incorrect');
    }
});

router.post('/dashboard', verify, (req, res) => {
    findUser(req.session.username, function(err, user) {
        if(req.body._method && req.body._method === 'put') {
            if (req.body.bio) {
                User_Personal.findOneAndUpdate({username: req.session.username}, {$set:{name: req.body.name, bio: req.body.bio}})
                .then(function(info) {
                    findStats(req.session.username, function(err, stats) {
                        info.bio = req.body.bio;
                        info.name = req.body.name;
                        res.render('../frontEnd/views/dashboard', {user: user, self: info, stats: stats});
                    });
                });
            } else if (req.body.height || req.body.weight || req.body.age || req.body.gender || req.body.bench || req.body.weightGoal) {
                User_Stats.findOneAndUpdate({username: req.session.username}, 
                    {$set:{height: req.body.height, weight: req.body.weight, age: req.body.age, gender: req.body.gender, weightGoal: req.body.weightGoal, bench: req.body.bench}})
                .then(function(info){
                    findPersonal(req.session.username, function(err, personal_stats) {
                        info.height = req.body.height;
                        info.weight = req.body.weight;
                        info.age = req.body.age;
                        info.gender = req.body.gender;
                        info.bench = req.body.bench;
                        info.weightGoal = req.body.weightGoal;
                        res.render('../frontEnd/views/dashboard', {user: user, self: personal_stats, stats: info});
                    });
                });
            } else {
                //edge case, fix here!
            }

        } else {
            findPersonal(req.session.username, function(err, personal_stats) {
                findStats(req.session.username, function(err, stats) {
                    res.render('../frontEnd/views/dashboard', {user: user, self: personal_stats, stats: stats});
                });
            });
        }
    });
});

router.get('/dashboard', (req, res) => {
    if (req.session.username){
        findUser(req.session.username, function(err, user){
            findPersonal(req.session.username, function(err, personal_stats){
                findStats(req.session.username, function(err, stats){
                    res.render(path.join(__dirname, '../frontEnd/views/dashboard'), {user: user, self: personal_stats, stats: stats});
                });
            });
        });
    } else {
        res.redirect('/');
    }
});

router.post('/dashboard/avatar', upload.single('avatar'), (req, res) => {
    User_Personal.findOneAndUpdate({username: req.session.username},
        {$set:{img_src: '<img src="/static/uploads/'+ req.file.filename +'" class="image" id="mypic" alt="defaultpic">'}},
        {new: true, upsert: true})
        .then(function(personal_stats) {
        findUser(req.session.username, function(err, user) {
            findStats(req.session.username, function(err, stats) {
                personal_stats.img_src='<img src="/static/uploads/'+ req.file.filename +'" class="image" id="mypic" alt="defaultpic">';
                res.render('../frontEnd/views/dashboard', {user: user, self: personal_stats, stats: stats});
            });
        });
    });
});


//remove user from db
router.delete('/users/:id', (req, res) => {
    User.findOneAndDelete({username: req.params.id}).then(function(user) {
        res.send('Deleted: ' + user);
    }).catch(err => res.status(400).send(err));
});

router.get('/Excercises', (req, res) => {
  res.render('../frontEnd/views/Exercises')
  res.end();
});

router.post('/signout', (req, res) => {
    req.session.destroy((err) => res.redirect('/'));
});


module.exports = router;
