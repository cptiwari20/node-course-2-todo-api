const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const  bcrypt = require('bcryptjs');


var password = 'asdasd123';
// create hash by salting
// bcrypt.genSalt(11, (err, salt)=>{
//     bcrypt.hash(password, salt, (err, hash)=> {
//         console.log(hash)
//     })
// })
var hashedPass = '$2a$11$qINabAs8uIgoEKCnOdC3p.4Vp/gU8tTG.9sqpLk/u0Ng.j04JMw0e';

bcrypt.compare(password, hashedPass, (err, res)=>{
    console.log(res)
})



// var data = { id : 4}
// var token = jwt.sign(data, "secret");
// console.log(token)

// var decoded = jwt.verify(token, "secret");
// console.log("Decoded:", decoded)
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