// ================= STATE =================
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// ================= SAVE TO STORAGE =================
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ================= RENDER FUNCTION =================
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete-btn">X</button>
    `;

    // Toggle Complete
    li.querySelector("span").addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // Delete Task
    li.querySelector(".delete-btn").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
}

// ================= ADD TASK =================
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();

  if (text === "") return;

  tasks.push({ text: text, completed: false });

  saveTasks();
  renderTasks();

  taskInput.value = "";
});

// ================= INITIAL LOAD =================
renderTasks();
