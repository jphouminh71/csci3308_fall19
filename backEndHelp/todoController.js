// we passed our app into the this controller
var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];  // dummy data
var bodyParser = require('body-parser'); // need this to have access to form data
var mongoose = require('mongoose');   // this is for connecting to mongodb

//connect to the database
mongoose.connect('mongodb+srv://test:test@todo-mjnvh.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology : true, useCreateIndex: true}).catch(error => handleError(error));

// create a scheme - this is like a blueprint
var todoScheme = new mongoose.Schema({      // this is what mongodb is expecting from out todo data
  item: String
});

var Todo = mongoose.model('Todo',todoScheme);    // setting up a model named called 'Todo', will be stored as collection in 'mongodb'
/*testing pushing an item to db
var itemOne = Todo({item: 'buy flowers'}).save(function(err){
  if (err){
    throw err;
  }
  console.log('item saved to db');
});  // created item of type 'Todo'
*/
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

// load the view when they want to come here
app.get('/todo',function(req,res,next){
  // get data from mongodb and pass it to the view
  // Todo.find({item: 'buy flowers'}); finds that item in the collection if it exists
  // Todo.find({},function(err,data){  // this is gonna go out and retrieve all the items in the collection
  //   if (err) throw err
  //   res.render('todo', {todos: data});
  // }).catch(next);
  res.send('this');
});

// for when we have to handle submissions
app.post('/todo',urlencodedParser,function(req,res,next){    // have access to the form data with the second param
  // get data from the view and add it to mongodb
  var newTodoItem = Todo(req.body, 'todoScheme').save(function(err,data){
    if (err) throw err;
    res.json(data);
  }).catch(next);
});

// going to fire when we get a delete request
app.delete('/todo/:item',function(req,res,next){   //:item gives us access to the element we want to delete
  // delete the requested item from mongodb
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err,data){
    if (err) throw err;
    res.json(data);   // deletes the item and passes back the updated data
  }).catch(next);
});

};
