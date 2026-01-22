let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const progressFill = document.getElementById("progressFill");
const jokeBox = document.getElementById("joke");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateProgress() {
    const completed = tasks.filter(t => t.completed).length;
    totalTasks.innerText = `Total: ${tasks.length}`;
    completedTasks.innerText = `Completed: ${completed}`;
    progressFill.style.width = tasks.length ? (completed / tasks.length) * 100 + "%" : "0%";
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (
            (currentFilter === "completed" && !task.completed) ||
            (currentFilter === "pending" && task.completed)
        ) return;

        const li = document.createElement("li");
        li.classList.add(task.priority);
        if (task.completed) li.classList.add("completed", "celebrate");

        li.innerHTML = `
            <span>${task.text}</span>
            <div class="actions">
                <button onclick="toggleTask(${index})">
                    <i class="fa-solid ${task.completed ? "fa-rotate-left" : "fa-check"}"></i>
                </button>
                <button onclick="editTask(${index})">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button onclick="deleteTask(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        taskList.appendChild(li);
    });

    updateProgress();
    saveTasks();
}

function addTask() {
    const text = taskInput.value.trim();
    const priority = prioritySelect.value;
    if (!text) return;

    tasks.push({ text, completed: false, priority });
    taskInput.value = "";
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        new Audio("https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3").play();
    }
    renderTasks();
}

function editTask(index) {
    const updated = prompt("Edit task", tasks[index].text);
    if (updated) {
        tasks[index].text = updated;
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function setFilter(filter) {
    currentFilter = filter;
    renderTasks();
}

/* API */
async function loadJoke() {
    try {
        const res = await fetch("https://api.chucknorris.io/jokes/random");
        const data = await res.json();
        jokeBox.innerText = data.value;
    } catch {
        jokeBox.innerText = "Stay focused. You got this 💪";
    }
}

loadJoke();
renderTasks();
