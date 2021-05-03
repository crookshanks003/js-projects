let ul = document.querySelector('ul#items');
const taskForm = document.querySelector('form');
let tasks = JSON.parse(localStorage.getItem('tasks'));
const searchBar = document.getElementById('filter');

ul.addEventListener('click', deleteTask);
searchBar.addEventListener('keyup', search);
document.addEventListener('DOMContentLoaded', localToUi);
taskForm.addEventListener('submit', submitTask);

function submitTask(e) {
    e.preventDefault();
    const task = document.getElementById('item').value;
    if (task === ""){
        alert("Empty task not allowed");
    }
    addTask(task);
    if (tasks === null) {
        tasks = [];
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function localToUi() {
    tasks.forEach(function (task) {
        addTask(task);
    })
}

function addTask(task) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(task));
    li.setAttribute('class', 'list-group-item');
    const btn = document.createElement("button");
    btn.appendChild(document.createTextNode("X"));
    btn.setAttribute("class", "btn btn-danger btn-sm float-right delete");
    li.appendChild(btn);
    ul.appendChild(li);
}

function search(e) {
    const searchFor = e.target.value.toLowerCase();
    const tasksList = document.getElementsByTagName("li");
    Array.from(tasksList).forEach(function (task) {
        if (task.firstChild.textContent.toLowerCase().indexOf(searchFor) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

function deleteTask(e) {
    if (e.target.classList.contains('btn-danger')) {
        const li = e.target.parentElement;
        if (confirm("Are you sure")) {
            const index = tasks.indexOf(li.firstChild.textContent);
            if (index != -1) {
                tasks.splice(index, 1);
                ul.removeChild(li);
            }
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
