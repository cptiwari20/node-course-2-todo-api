var express		 = require('express');
var bodyParser   = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose}   = require('./db/mongoose');
var {Todo}	     = require('./models/todo');
var {User}	     = require('./models/user');
var app    		   = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var newTodo = new Todo({
		text: req.body.text
	});
	newTodo.save().then((doc) => {
		res.send(doc)
	}, (e) => {
		res.status(400).send(e);
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
 		res.status(400).send(e);
 	})
});

app.get("/todos", (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e)
	})
});
//get/todos//asd123
app.get('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(400).send();
	}
	Todo.findById(id).then((todo) => {
		if(!todo){
			return res.status(400).send()
		}
		res.send({todo})
	}).catch((e) => {
		return res.status(400).send();
	});
});

app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(400).send()
	}
	Todo.findByIdAndRemove(id).then((todo) => {
		if(!todo){
			return res.status(400).send()
		};
		res.send({todo})
	}).catch ((e)=>{
		return res.status(400),send()
	})
})


app.listen(port, () => {
	console.log("local server has been started! its port:", port)
});

module.exports = {app};
