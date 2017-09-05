const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODO_LIST_ID_ACTIVE = "active";
const TODO_LIST_ID_COMPLETE = "complete";
const TODO_LIST_ID_DELETE = "delete";
const NEW_TODO_INPUT_ID = "new_todo_input";
const COMPLETE_VISIBLE_ID = "visible_complete_anchor";
const COMPLETE_HIDDEN_ID = "hidden_complete_anchor";
const DELETE_VISIBLE_ID = "visible_delete_anchor";
const DELETE_HIDDEN_ID = "hidden_delete_anchor";

var table1 = document.createElement("table");
var table2 = document.createElement("table");
var table3 = document.createElement("table");

window.onload = getTodosAJAX();

function activeElement(id, todo_data_json) {
    var todos = JSON.parse(todo_data_json);
    var parent = document.getElementById(id);
    parent.innerHTML = "";

    if (parent) {
        Object.keys(todos).forEach( function (key) {
            if (todos[key].status == "ACTIVE") {
                parent.appendChild(activeTodoElement(key, todos[key]));
            }
        });
    }
}

function completeElement(id, todo_data_json) {
    var todos = JSON.parse(todo_data_json);
    var parent = document.getElementById(id);
    parent.innerHTML = "";

    if (parent) {
        Object.keys(todos).forEach( function (key) {
            if (todos[key].status == "COMPLETE") {
                parent.appendChild(completeTodoElement(key, todos[key]));
            }
        });
    }
}

function deleteElement(id, todo_data_json) {
    var todos = JSON.parse(todo_data_json);
    var parent = document.getElementById(id);
    parent.innerHTML = "";

    if (parent) {
        Object.keys(todos).forEach( function (key) {
            if (todos[key].status == "DELETED") {
                parent.appendChild(deleteTodoElement(key, todos[key]));
            }
        });
    }
}

function activeTodoElement(id, todo_object) {
    table1.innerHTML = "";
    var row = table1.insertRow();
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);

    cell1.innerText = todo_object.title;
    cell1.setAttribute("data-id", id);
    cell1.setAttribute("class", "todoStatus" + todo_object.status);
    cell0.appendChild(createCompleteButton(id));
    cell2.appendChild(createDeleteButton(id));
    return row;
}

function completeTodoElement(id, todo_object) {

    table2.innerHTML = "";
    var row = table2.insertRow();
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);

    cell1.innerText = todo_object.title;
    cell1.setAttribute("data-id", id);
    cell1.setAttribute("class", "todoStatus" + todo_object.status);

    cell0.innerHTML = '<input type="checkbox" checked="true">';
    cell0.setAttribute("onclick", "activeTodoAJAX(" + id + ")");
    cell0.setAttribute("class", "breathHorizontal");

    cell2.appendChild(createDeleteButton(id));

    return row;

}

function deleteTodoElement(id, todo_object) {
    table3.innerHTML = "";
    var row = table3.insertRow();
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);

    cell1.innerText = todo_object.title;
    cell1.setAttribute("data-id", id);
    cell1.setAttribute("class", "todoStatus" + todo_object.status);
    return row;
}

function createCompleteButton(id) {
    var complete_button = document.createElement("checkbox");
    complete_button.innerHTML = '<input type="checkbox">';
    complete_button.setAttribute("onclick", "completeTodoAJAX(" + id + ")");
    complete_button.setAttribute("class", "breathHorizontal");
    return complete_button;
}

function createDeleteButton(id) {
    var delete_button = document.createElement("img");
    delete_button.style.height = "10px";
    delete_button.style.width = "10px";
    delete_button.setAttribute('src', '/image/cross.jpg');
    delete_button.setAttribute("onclick", "deleteTodoAJAX(" + id + ")");
    delete_button.setAttribute("class", "breathHorizontal");
    return delete_button;
}

function getTodosAJAX() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                console.log(xhr.responseText);
                activeElement(TODO_LIST_ID_ACTIVE, xhr.responseText);
                completeElement(TODO_LIST_ID_COMPLETE, xhr.responseText);
                deleteElement(TODO_LIST_ID_DELETE, xhr.responseText);
            }
        }
    };
    xhr.send(data=null);
}

function addTodoAJAX() {
    var title = document.getElementById(NEW_TODO_INPUT_ID).value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var data = "todo_title=" + encodeURI(title);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                activeElement(TODO_LIST_ID_ACTIVE, xhr.responseText);
                completeElement(TODO_LIST_ID_COMPLETE, xhr.responseText);
                deleteElement(TODO_LIST_ID_DELETE, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(data);
}

function activeTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=ACTIVE";

    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                activeElement(TODO_LIST_ID_ACTIVE, xhr.responseText);
                completeElement(TODO_LIST_ID_COMPLETE, xhr.responseText);
                deleteElement(TODO_LIST_ID_DELETE, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(data);
}


function completeTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=COMPLETE";

    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                activeElement(TODO_LIST_ID_ACTIVE, xhr.responseText);
                completeElement(TODO_LIST_ID_COMPLETE, xhr.responseText);
                deleteElement(TODO_LIST_ID_DELETE, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(data);
}

function deleteTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/todos/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=DELETED";

    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                activeElement(TODO_LIST_ID_ACTIVE, xhr.responseText);
                completeElement(TODO_LIST_ID_COMPLETE, xhr.responseText);
                deleteElement(TODO_LIST_ID_DELETE, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(data);
}

function hideComplete() {
    var complete_visible_id = document.getElementById(TODO_LIST_ID_COMPLETE);
    var anchor_visible_id = document.getElementById(COMPLETE_VISIBLE_ID);
    var anchor_hidden_id = document.getElementById(COMPLETE_HIDDEN_ID);
    complete_visible_id.style.display = "none";
    anchor_visible_id.style.display = "none";
    anchor_hidden_id.style.display = "table";
}
function showComplete() {
    var complete_visible_id = document.getElementById(TODO_LIST_ID_COMPLETE);
    var anchor_visible_id = document.getElementById(COMPLETE_VISIBLE_ID);
    var anchor_hidden_id = document.getElementById(COMPLETE_HIDDEN_ID);
    complete_visible_id.style.display = "table";
    anchor_visible_id.style.display = "table";
    anchor_hidden_id.style.display = "none";
}
function hideDelete() {
    var delete_visible_id = document.getElementById(TODO_LIST_ID_DELETE);
    var anchor_visible_id = document.getElementById(DELETE_VISIBLE_ID);
    var anchor_hidden_id = document.getElementById(DELETE_HIDDEN_ID);
    delete_visible_id.style.display = "none";
    anchor_visible_id.style.display = "none";
    anchor_hidden_id.style.display = "table";
}
function showDelete() {
    var delete_visible_id = document.getElementById(TODO_LIST_ID_DELETE);
    var anchor_visible_id = document.getElementById(DELETE_VISIBLE_ID);
    var anchor_hidden_id = document.getElementById(DELETE_HIDDEN_ID);
    delete_visible_id.style.display = "table";
    anchor_visible_id.style.display = "table";
    anchor_hidden_id.style.display = "none";
}

