require('./config/config');
var express		   = require('express');
const _            = require('lodash');
const bodyParser   = require('body-parser');
const {ObjectID}   = require('mongodb');

var {mongoose}     = require('./db/mongoose');
var {Todo}	       = require('./models/todo');
var {User}	       = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app    		   = express();
var port 		   = process.env.PORT || 3000;

app.use(bodyParser.json());

//Create Todos
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
//Read /get all
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
 // Delete
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
});
//update
app.patch("/todos/:id", (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);
	if(!ObjectID.isValid(id)) {
		return res.status(400).send();
	}
	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	}else{
		body.completedAt = null;
		body.completed = false;
	};
	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) =>{
		if(!todo){
			return res.status(400).send();
		}
		res.send({todo});
	}).catch ((e) =>{
		return res.send(400).send();
	});
});
// User
app.post("/users", (req, res) => {
	var body = _.pick(req.body, ['email', 'password'])
	var user = new User(body);
	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) =>{
		res.header('x-auth', token).send(user)
	}).catch((e) => {
		res.status(400).send(e);
	})
});


app.get('/users/me', authenticate, (req, res)=> {
	res.send(req.user);
})

app.listen(port, () => {
	console.log("local server has been started! its port:", port)
});

module.exports = {app};
