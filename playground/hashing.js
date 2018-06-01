const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = { id : 4}
var token = jwt.sign(data, "secret");
console.log(token)

var decoded = jwt.verify(token, "secret");
console.log("Decoded:", decoded)
// var msg = "This is a text!";
// console.log("Message:", msg);
// var hash = SHA256(msg).toString();
// console.log("Hash:", hash);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + "secret").toString()
// };
//  var resultHash = SHA256(JSON.stringify(data) + "secret").toString();

// token.data.id = 4;
// token.hash = SHA256(JSON.stringify(token.data) + "secret").toString();

//  if(resultHash === token.hash){
//      console.log("Data has not Changed!");
//  }else{
//      console.log("Data has been Changed! Do not trust!!")
//  }