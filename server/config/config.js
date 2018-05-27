var env = process.env.NODE_ENV || 'development';
console.log("env ******", env);
if(env === 'development'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/new-Todo'
}else if (env === "test") {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/Todo-Test'
} else{
  process.env.MONGODB_URI = 'mongodb://node-user:pass1234@ds239309.mlab.com:39309/node-todo-api'
}
