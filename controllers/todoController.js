var bodyParser = require('body-parser')
var mongoose = require('mongoose')

// connect to database
mongoose.connect("mongodb+srv://test:test@todo-app.fnwbh.mongodb.net/Todo-app?retryWrites=true&w=majority")

// create schema
var todoSchema = new mongoose.Schema({
    item: String
})

// create model
var Todo  = mongoose.model('Todo',todoSchema)

var urlencodedParser = bodyParser.urlencoded({ extended: false })
module.exports = function(app) {
    app.get("/todo", function(req,res){
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo', {todos: data});
        })
    });
    app.post("/todo", urlencodedParser, function(req,res){
        // get data from view add to mongodb
        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data)
        })
    });
    app.delete("/todo:item", function(req,res){
        Todo.find({item: req.params.item.replace(/\./g, " ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        })
    });
}