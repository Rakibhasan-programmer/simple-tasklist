let form = document.querySelector("#task_form");
let newTask = document.querySelector("#new_task");
let filter = document.querySelector("#task_filter");
let tasks = document.querySelector("ul");
let clearTask = document.querySelector("#clear_task_btn");

// define eventlistener

form.addEventListener("submit", addTask);
tasks.addEventListener("click", removeTask);
clearTask.addEventListener("click", clearAllTask);
filter.addEventListener("keyup", filtering);
document.addEventListener("DOMContentLoaded", getTasks);


//Function/add task
function addTask(e){
    if(newTask.value === " "){
        alert("Add a task !");
    }
    else{
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(newTask.value + " "));
        let link = document.createElement("a");

        link.setAttribute("href", "#");
        link.innerHTML = "X";

        li.appendChild(link);
        tasks.appendChild(li);

        storeTaskInLocalStorage(newTask.value);


        newTask.value = " ";
    }
    e.preventDefault();
}

//Remove task

function removeTask(e){
    if(e.target.hasAttribute("href")){
        if(confirm("Are You Sure ? You eant to remove ?")){
            let val = e.target.parentElement;
            val.remove();

            removeFromLS(val);
        }
    }
}

// clear task
function clearAllTask(e){
    tasks.innerHTML = " ";
    localStorage.clear();
}


//Filter Task

function filtering(e){
    let text = e.target.value.toLowerCase();

    document.querySelectorAll("li").forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = "block";
        }
        else{
            task.style.display = "none";
        }
    })
}

// store value

function storeTaskInLocalStorage(task){
    let allTask;
    if(localStorage.getItem("allTask") === null){
        allTask = [];
    }else{
        allTask = JSON.parse(localStorage.getItem("allTask"));
    }

    allTask.push(task);
    localStorage.setItem("allTask", JSON.stringify(allTask));
}

function getTasks(){
    let allTask;
    if(localStorage.getItem("allTask") === null){
        allTask = [];
    }else{
        allTask = JSON.parse(localStorage.getItem("allTask"));
    }

    allTask.forEach(task => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement("a");

        link.setAttribute("href", "#");
        link.innerHTML = "X";

        li.appendChild(link);
        tasks.appendChild(li);
    })
}

//Remove from local Storage

function removeFromLS(taskItem){
    let allTask;
    if(localStorage.getItem("allTask") === null){
        allTask = [];
    }else{
        allTask = JSON.parse(localStorage.getItem("allTask"));
    }

    let li = taskItem;
    li.removeChild(li.lastChild);

    allTask.forEach((task, index) => {
        if(li.textContent.trim() === task){
            allTask.splice(index, 1);
        }
    });

    localStorage.setItem("allTask", JSON.stringify(allTask));
    
}
