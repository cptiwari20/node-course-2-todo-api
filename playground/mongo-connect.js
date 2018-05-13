// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if(err){
		return console.log("Unable to connect the Mongo server")
	};
	console.log("Server connected");
	const db = client.db("TodoApp");

	// db.collection('TodoApp').insertOne({
	// 	text: 'vikas tiwari',
	// 	completed: false
	// }, (err, result) => {
	// 	if(err){
	// 		console.log("unable to eInsert data", err);
	// 	};
	// 	console.log(JSON.stringify(result.ops, undefined, 2))
	// })

	db.collection('Users').insertOne({
		name: 'vikas tiwari',
		age: 20,
		location: "Jabalpur",
		completed: false,
		_id:1234
	}, (err, result) => {

		if(err){
			console.log("unable to Insert data", err);
		};
		console.log(JSON.stringify(result.ops, undefined, 2))
	})

	// client.close()
})

// C:\Program Files\MongoDB\Server\3.4\bin mongo.exe --dbpath C:\users\chandu\mongo-data
