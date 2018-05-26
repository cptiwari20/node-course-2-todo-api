const {ObjectID} = require('mongodb');
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');



var userId = "5a2824adf491512b9c591ef3";
var id = "5afc4d06af8d2221dc8424c3";

if(!ObjectID.isValid(id)){
  console.log("Id is not Valid");
}

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log("new Todo", todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todos) => {
//   console.log("new Todo", todos);
// });

Todo.findById(id).then((todos) => {
  console.log("Todo", todos);
})
User.findById(userId).then((users) => {
  if(!users){
    console.log("No user Id is Found");
  }
  console.log("User", users);
}).catch((e) => {
  console.log("No User Found", e);
});
