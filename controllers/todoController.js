var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var data = [{
    item: 'get milk'
},
{
    item: 'walk dog'
},
{
    item: 'kick some dogs'
}]

module.exports = function(app) {
    app.get("/todo", function(req,res){
        res.render('todo', {todos: data});
    });
    app.post("/todo", urlencodedParser, function(req,res){
        // this example is also for -  how to handle ajax
            data.push(req.body)
            res.json(data)
            // res.render('todo',{todos:data})
    });
    app.delete("/todo:item", function(req,res){
        data = data.filter(function(todo) {
            return todo.item.replace( / /g, '-') !== req.params.item
        })
        res.json(data)
    });
}