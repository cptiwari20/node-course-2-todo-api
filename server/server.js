var express		 = require('express');
var bodyParser   = require('body-parser');

var {mongoose}   = require('./db/mongoose');
var {todo}	     = require('./models/todo');
var {User}	     = require('./models/user');
var app    		 = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var newTodo = new todo({
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

 })

app.listen(3000, () => {
	console.log("local server 3000 has been started")
});

module.exports = {app};
