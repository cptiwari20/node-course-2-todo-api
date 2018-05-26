var express		 = require('express');
var bodyParser   = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose}   = require('./db/mongoose');
var {Todo}	     = require('./models/todo');
var {User}	     = require('./models/user');
var app    		   = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var newTodo = new Todo({
		text: req.body.text
	});
	newTodo.save().then((doc) => {
		res.send(doc)
	}, (e) => {
		console.log("Unable to save", e)
	})
});
 app.post("/users", (req, res) => {
 	var newUser = new User ({
 		name: req.body.name,
 		email: req.body.email
 	});
 	newUser.save().then((doc) => {
 		res.send(doc)
 	}, (e) => {
 		console.log("unabe to save new user", e)
 	})
});

app.get("/todos", (req, res) => {
	todo.find().then((todos) => {
		res.send(JSON.stringify({todos}));
	}, (e) => {
		res.status(400).send(e)
	})
});
//get/todos//asd123
app.get('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		console.log("No Id Found");
		return res.status(400).send();
	}
	Todo.findById(id).then((todo) => {
		if(!todo){
			console.log("No Todo of this Id Found");
			return res.status(400).send()
		}
		res.send({todo})
	}).catch((e) => {
		return res.status(400).send();
	});
});

var port = 3030 || 3000;
app.listen(port, () => {
	console.log("local server has been started! its port:", port)
});

module.exports = {app};
