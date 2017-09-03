var StatusEnums={
    ACTIVE : "ACTIVE",
    COMPLETE : "COMPLETE",
    DELETED : "DELETED"
}

var todos={
    1: {title : "Learn CSS" , status : StatusEnums.ACTIVE},
    2: {title : "Install Webstorm" , status : StatusEnums.ACTIVE},
    3: {title : "Understand Git" , status : StatusEnums.ACTIVE},
    4: {title : "Async JS" , status : StatusEnums.ACTIVE},
    5: {title : "Install nodemon" , status : StatusEnums.ACTIVE},
    6: {title : "some todo1" , status : StatusEnums.ACTIVE},
    7: {title : "some todo2" , status : StatusEnums.ACTIVE},

}

var next_todo_id = 8;

module.exports =
    {
        StatusEnum : StatusEnums,
        todos : todos,
        next_todo_id : next_todo_id
    }

