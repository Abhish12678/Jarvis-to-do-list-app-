let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${task}
            <button class="delete-btn" onclick="deleteTask(${index})">X</button>
        `;

        list.appendChild(li);
    });
}

function addTask() {
    let input = document.getElementById("taskInput");

    if (input.value === "") return;

    tasks.push(input.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    showTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
}

showTasks();
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 🔔 Notification permission
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

function showTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let completed = 0;

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        if (task.done) {
            completed++;
        }

        li.innerHTML = `
            <span onclick="toggleTask(${index})" class="${task.done ? 'completed' : ''}">
                ${task.text} (${task.time || "No time"})
            </span>
            <div>
                <button onclick="deleteTask(${index})">X</button>
            </div>
        `;

        list.appendChild(li);

        // ⏰ Reminder logic
        if (task.time && !task.done) {
            let now = new Date();
            let taskTime = new Date();
            let [hours, minutes] = task.time.split(":");

            taskTime.setHours(hours, minutes, 0);

            let diff = taskTime - now;

            if (diff > 0) {
                setTimeout(() => {
                    new Notification("⏰ Reminder", {
                        body: task.text
                    });
                }, diff);
            }
        }
    });

    // 📊 Progress calculation
    let percent = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);
    document.getElementById("progress").innerText = `Progress: ${percent}%`;
}

function addTask() {
    let input = document.getElementById("taskInput");
    let time = document.getElementById("taskTime").value;

    if (input.value === "") return;

    tasks.push({
        text: input.value,
        time: time,
        done: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    showTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
}

// ✅ Toggle complete
function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
}

showTasks();