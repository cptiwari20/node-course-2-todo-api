const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log("Unable to connect the Mongo server")
	};
	console.log("Server connected");
// find the data by specific property AND UPDATE
	db.collection('Users').findOneAndUpdate({ 
		_id: new ObjectID('5a224369a61a404e1fa4f06d')
	},{
		$set: { name: "chandra prakash"},
		$inc: {age: 2}
	},{ returnOriginal: false }).then((result)=>{
		console.log(result)
	}, (err)=> {
		console.log('Unable to UPDATE the data', err)
	})

	//count the coolection files
	db.collection('Users').count().then((count) => {
		console.log(count)
	})
});