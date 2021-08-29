// express
var express = require('express');
var app = express();

// controller
var todoController = require('./controllers/todoController')

// template engine / setup view engine
app.set('view engine', 'ejs');

// static files like css
app.use(express.static('./public'))

// fire Controllers
todoController(app)

// port 
app.listen(3000);
console.log("You are listening to port 3000")