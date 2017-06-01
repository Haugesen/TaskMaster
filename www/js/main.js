//      _____           _           _    __   __
//     |  __ \         (_)         | |   \ \ / /
//     | |__) | __ ___  _  ___  ___| |_   \ V / 
//     |  ___/ '__/ _ \| |/ _ \/ __| __|   > <  
//     | |   | | | (_) | |  __/ (__| |_   / . \ 
//     |_|   |_|  \___/| |\___|\___|\__| /_/ \_\
//                    _/ |                      
//                   |__/                       
//                              By Joachim Hauge


// load todo items
var itemInput   = document.querySelector('#add-item-text');
var todoListDiv = document.querySelector('.todo');
var doneListDiv = document.querySelector('.done');
var addItemBtn  = document.querySelector('#add-item-btn');


addItemBtn.addEventListener('mousedown', function (event) {

    addNewToDoItem();
});

itemInput.addEventListener('keydown', function (event) {

    if (event.which === 13) addNewToDoItem();
});


// Load tasks
var todoList = JSON.parse(localStorage.getItem("todo")) || [];

if(todoList.length === 0) todoListDiv.parentElement.classList.add('empty');

for (var i = 0; i < todoList.length; i++) {

    addTodoToPage(todoList[i]);
}

var doneList = JSON.parse(localStorage.getItem("done")) || [];

if(doneList.length === 0) doneListDiv.parentElement.classList.add('empty');

for (var i = 0; i < doneList.length; i++) {

    addDoneToPage(doneList[i]);
}


function addNewToDoItem() {

    // get task title
    var taskTitle = itemInput.value.trim();
    itemInput.value = '';

    // create a task object
    var task = {
        "title": taskTitle,
        "date": "Set date",
        "id": Date.now()
    };

    // add task to the page
    addTodoToPage(task);

    // get todo items from the local store
    var todoListStore = JSON.parse(localStorage.getItem("todo")) || [];
    todoListStore.push(task);

    // save todo items to the local store
    localStorage.setItem("todo", JSON.stringify(todoListStore));
};

/*
    addTODOToPage(task[Object])
*/
function addTodoToPage(task) {
    
    todoListDiv.parentElement.classList.remove('empty');
    
    var taskElement = document.createElement('li');
    taskElement.innerHTML = `${task.title} 
                    <div class="item-options">
                        <!--input class="set-date" type="text" placeholder="Set date"-->
                        <button class="options completed"></button>
                        <div class="separation-options"></div>
                        <button class="options delete"></button>
                    </div>`;

    todoListDiv.appendChild(taskElement);
    
    // add delete button
    var deleteButton = taskElement.querySelector('.delete');
    
    deleteButton.addEventListener('mousedown', function (event) {
        
        taskElement.parentNode.removeChild(taskElement);
        removeItemFromLocalStore("todo", task.id);
    });
    
    // add done button
    var doneButton = taskElement.querySelector('.completed');
    
    doneButton.addEventListener('mousedown', function (event) {
        
        addDoneToPage(task);
        
        
        // get todo items from the local store
        var doneListStore = JSON.parse(localStorage.getItem("done")) || [];
        doneListStore.push(task);
        localStorage.setItem("done", JSON.stringify(doneListStore));
        
        taskElement.parentNode.removeChild(taskElement);
        removeItemFromLocalStore("todo", task.id);
    });
}

/*
    addDoneToPage(task[Object])
*/
function addDoneToPage(task) {
    
    doneListDiv.parentElement.classList.remove('empty');
    
    var taskElement = document.createElement('li');
    taskElement.innerHTML = `${task.title} 
                    <div class="item-options">
                        <button class="options delete"></button>
                    </div>`;

    doneListDiv.appendChild(taskElement);
    
    // add delete button
    var deleteButton = taskElement.querySelector('.delete');
    
    deleteButton.addEventListener('mousedown', function (event) {
        
        taskElement.parentNode.removeChild(taskElement);
        removeItemFromLocalStore("done", task.id);
    });
}

/*
    removeItemFromLocalStore(storeKey[String], id[Number])
*/
function removeItemFromLocalStore(storeKey, id) {
    
    var itemList = JSON.parse(localStorage.getItem(storeKey));
    
    for(var i = 0; i < itemList.length; i++){
        var taskId = itemList[i].id;
        if(taskId === id) {
            break;
        }
    }
    itemList.splice(i, 1);
    
    localStorage.setItem(storeKey, JSON.stringify(itemList));
    
    if(storeKey == "todo" && itemList.length === 0){
        todoListDiv.parentElement.classList.add('empty');
    }
    
    if(storeKey == "done" && itemList.length === 0){
        doneListDiv.parentElement.classList.add('empty');
    }
}