var express = require("express");
var todos_db = require("./seed.js");

var bodyParser = require("body-parser");



var app = express();


app.use("/", function(req, res, next){
    console.log("Request");
    console.log(req.url);
    console.log(req.method);

    next();
});

app.use("/", express.static(__dirname+"/public"));


// 1. get all todos
// http://localhost:4000/todos/ GET


// GET /todos
// Return a JSON object of all of these todos

// API Part of this server

app.use("/", bodyParser.urlencoded({extended:false}));



app.get("/api/todos", function(req, res){
    res.json(todos_db.todos);
})


// 2. delete a todo (with some id:id)
// http://localhost:4000/todos/:id DELETE

app.delete("/api/todos/:id", function(req, res) {


    // todos_db
    // todos_db.data = {id : {title:, status:} , id : {title:, status:}

    var del_id = req.params.id;
    var todo = todos_db.todos[del_id];
    if (!todo) {
        res.status(400).json({error: "Todo doesn't exist"});
    }
    else {
        todo.status = todos_db.StatusENUMS.DELETED;
        res.json(todos_db.todos);
    }

});



// 3. add a todo
// http://localhost:4000/todos POST




app.post("/api/todos", function(req, res){


    var todo = req.body.todo_title;

    if (!todo || todo == "" || todo.trim() == ""){
        res.status(400).json({error : "Todo Title Can't Be Empty"});
    }

    else {

        var new_todo_object = {
            title : req.body.todo_title,
            status : todos_db.StatusENUMS.ACTIVE
        }

        todos_db.todos[todos_db.next_todo_id] = new_todo_object;
        todos_db.next_todo_id = todos_db.next_todo_id + 1;
        res.json(todos_db.todos);

    }

})





// 4. complete a todo - that's like modifying
// http://localhost:4000/todos/:id PUT


app.put("/api/todos/:id", function(req, res) {


    // todos_db
    // todos_db.data = {id : {title:, status:} , id : {title:, status:}

    var mod_id = req.params.id;
    var todo = todos_db.todos[mod_id];
    // if this todo doesn't exist
    // then send appropriate response to consumer
    if (!todo) {
        res.status(400).json({error: "Can't modify a todo that doesnt exist"});
    }
    else {

        // Modify it if parameters present

        var todo_title = req.body.todo_title;

        if(todo_title && todo_title!="" && todo_title.trim()!=""){
            todo.title = todo_title;

        }

        var todo_status = req.body.todo_status;

        if(todo_status &&
            (todo_status == todos_db.StatusENUMS.ACTIVE ||
                todo_status== todos_db.StatusENUMS.COMPLETE )
        ) {
            todo.status = todo_status;
        }

        res.json(todos_db.todos);
    }


});





app.listen(4000);