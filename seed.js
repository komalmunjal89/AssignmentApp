var StatusENUMS = {

    ACTIVE : "ACTIVE",
    COMPLETE : "COMPLETE",
    DELETED : "DELETED"
}

var todos = {
    1 : {title : "Learn Javascript", status: StatusENUMS.ACTIVE},
    2 : {title : "Git Tutorial", status: StatusENUMS.ACTIVE},
    3 : {title : "Interactive Git", status: StatusENUMS.ACTIVE},
    4 : {title : "Interactive Git", status: StatusENUMS.COMPLETE},
    5 : {title : "Interactive Git", status: StatusENUMS.DELETED},
    6 : {title : "Interactive Git", status: StatusENUMS.COMPLETE}

};

var next_todo_id = 7;

module.exports = {
    StatusENUMS : StatusENUMS,
    todos : todos,
    next_todo_id : next_todo_id
}
