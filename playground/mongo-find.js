const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log("Unable to connect the Mongo server")
	};
	console.log("Server connected");
// find the data by specific property
	db.collection('Users').find({ _id: new ObjectID('5a1ed5064bf7512ed0a5ec94' )}).toArray().then((result)=>{
		console.log(result)
	}, (err)=> {
		console.log('Unable to fetch the data', err)
	})

	//count the coolection files
	db.collection('Users').count().then((count) => {
		console.log(count)
	})
});