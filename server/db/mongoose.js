var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://node-user:pass1234@ds239309.mlab.com:39309/node-todo-api" ||
	'mongodb://localhost:27017/new-Todo', {useMongoClient: true});

module.exports = {
	mongoose
}
