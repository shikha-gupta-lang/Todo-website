let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('task-list');
const numbers = document.getElementById('numbers');
const progress = document.getElementById('progress');
const celebration = document.getElementById('celebration');

document.getElementById('taskForm').addEventListener('submit', function (e) {
  e.preventDefault();
  addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    updateTasksList();
  }
}

function updateTasksList() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? 'completed' : ''}">
          <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <i class="fas fa-pen" onclick="editTask(${index})"></i>
          <i class="fas fa-trash" onclick="deleteTask(${index})"></i>
        </div>
      </div>
    `;
    listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));
    taskList.appendChild(listItem);
  });
  updateProgress();
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTaskComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateTasksList();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    updateTasksList();
  }
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  numbers.textContent = `${completed}/${total}`;
  progress.style.width = total === 0 ? '0%' : `${(completed / total) * 100}%`;

  if (total > 0 && completed === total) {
    celebration.style.display = 'flex';
    setTimeout(() => {
      celebration.style.display = 'none';
    }, 3000);
  }
}

updateTasksList();
