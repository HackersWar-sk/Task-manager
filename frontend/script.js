const API = "https://task-manager-backend-y1o5.onrender.com";

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/login?email=${email}&password=${password}`, {
        method: "POST"
    });

    const data = await res.json();

    if (res.ok && data.access_token) {
        localStorage.setItem("token", data.access_token);
        window.location.href = "index.html";
    } else {
        alert("Login failed");
    }
}

async function createTask() {
    const title = document.getElementById("taskInput").value;
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Login again");
        window.location.href = "login.html";
        return;
    }

    const res = await fetch(`${API}/tasks?title=${encodeURIComponent(title)}&token=${token}`, {
        method: "POST"
    });

    if (res.ok) {
        document.getElementById("taskInput").value = "";
        loadTasks();
    } else {
        alert("Task creation failed");
    }
}

async function loadTasks() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/tasks?token=${token}`);
    const data = await res.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    data.forEach(task => {
        const li = document.createElement("li");

        // ✅ CLEAN TEXT INSTEAD OF SYMBOL
        li.innerText = task.title + (task.completed ? " (Completed)" : " (Pending)");

        const completeBtn = document.createElement("button");
        completeBtn.innerText = "Complete";
        completeBtn.onclick = () => updateTask(task.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}

async function updateTask(id) {
    const token = localStorage.getItem("token");

    await fetch(`${API}/tasks/${id}?token=${token}`, {
        method: "PUT"
    });

    loadTasks();
}

async function deleteTask(id) {
    const token = localStorage.getItem("token");

    await fetch(`${API}/tasks/${id}?token=${token}`, {
        method: "DELETE"
    });

    loadTasks();
}

if (window.location.pathname.includes("index.html")) {
    loadTasks();
}