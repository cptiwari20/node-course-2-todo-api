const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos} = require('./seed/seed') 

beforeEach(populateTodos);

// create a todo;
describe("POST/todos", ()=>{
  it("it should create a new todo", (done)=>{
      var text = "test todo text";

    request(app)
      .post("/todos")
      .send({text})
      .expect(200)
      .expect((res) =>{
        expect(res.body.text).toBe(text);
      })
      .end((err, res) =>{
        if(err){
          return done(err)
        }

        Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });
  it("it should not create a new todo", (done) => {

    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) =>{
        if(err){
          return done(err)
        }

        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

//Get All Todo;
describe("GET/todos", ()=>{
  it("it should get all todos", (done) => {
  request(app)
    .get("/todos")
    .expect(200)
    .expect((res) =>{
      console.log( res.body.todos);
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});
// Get TOdo by Id
describe("GET/todos/:id", () => {
  it('should get the todo', (done) =>{
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) =>{
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done)
  });
  it('should show 404 as no Todo of this this Id', (done) =>{
    var hexID = new ObjectID().toHexString()
    request(app)
      .get(`/todos/${hexID}`)
      .expect(400)
      .end(done);
  });
  it('should 404 for Invalid Id', (done) =>{
    request(app)
      .get(`/todos/abc123`)
      .expect(400)
      .end(done);
  });
});

//delete routes
describe("DELETE /todos/:id", () =>{
  it("should delete a todo", (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }
        Todo.findById(hexId).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => done(e))
      })
  });
  it("should return 404 for Object Id not found", (done)=>{
    var hexID = new ObjectID().toHexString()
    request(app)
      .delete(`/todos/${hexID}`)
      .expect(400)
      .end(done);
  });
  it("should return 404 for Invalid Id", (done)=> {
    request(app)
      .delete(`/todos/abc123`)
      .expect(400)
      .end(done);
  });
});
//test for update routes
describe('PATCH /todos/:id', () =>{
  it('should update todo', (done)=>{
    var hexID = todos[0]._id.toHexString();
    var text = "This is an Update Text.";
    request(app)
      .patch(`/todos/${hexID}`)
      .send({
        text: text,
        completed: true
        })
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(true);
         expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });
  it('should clear completedAt when todo is not updated', (done)=>{
    var hexID = todos[0]._id.toHexString();
    var text = "This is an Update Text!!!!";
    request(app)
      .patch(`/todos/${hexID}`)
      .send({
        text: text,
        completed: false
        })
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(false);
         expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  })
})
