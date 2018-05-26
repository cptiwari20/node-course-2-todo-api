const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require('./../server/models/todo');

//Remove all the collection data
// Todo.remove({}).then((todos) => {
//   console.log(todos);
// });

 // remove by finding a single property of data
// Todo.findOneAndRemove({_id: "5b0927b2d46d5a1aa0035c19"}).then((delTodo)=>{
//   console.log(delTodo);
// });

// find by id and delete the data.
Todo.findByIdAndRemove("5b0927b2d46d5a1aa0035c1a").then((delTodo) =>{
  console.log(delTodo);
})
