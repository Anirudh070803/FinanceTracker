const API_URL = 'http://localhost:5000/api/tasks';

// Add a new task
document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, dueDate }),
    });

    loadTasks();
});

// Load all tasks
async function loadTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = tasks.map(task => `
        <li>
            <strong>${task.title}</strong> - ${task.status}
            <button onclick="deleteTask('${task._id}')">Delete</button>
        </li>
    `).join('');
}

// Delete a task
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadTasks();
}

// Initial load
loadTasks();
