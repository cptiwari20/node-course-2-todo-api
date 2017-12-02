const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log("Unable to connect the Mongo server")
	};
	console.log("Server connected");
  	
  	// delete many
	// db.collection('Users').deleteMany({ _id: new ObjectID('5a1ed5064bf7512ed0a5ec94' )}).sthen((result)=>{
	// 	console.log(result)
	// }, (err)=> {
	// 	console.log('Unable to delete the data', err)
	// })

// deleteone
		// db.collection('Users').deleteOne({ name: "vikas tiwari"}).then((result)=>{
		// 		console.log(result)
		// 	}, (err)=> {
		// 		console.log('Unable to delete the data', err)
		// 	})

			//findOneAndDelete
	db.collection('Users').findOneAndDelete({ completed: false}).then((result)=>{
				console.log(result)
			}, (err)=> {
				console.log('Unable to delete the data', err)
			})


	//count the coolection files
	db.collection('Users').count().then((count) => {
		console.log(count)
	})
});