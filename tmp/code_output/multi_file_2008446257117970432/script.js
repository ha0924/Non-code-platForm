// Task management application

// DOM elements
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskDescriptionInput = document.getElementById('task-description');
const taskDueDateInput = document.getElementById('task-due-date');
const taskPrioritySelect = document.getElementById('task-priority');
const tasksContainer = document.getElementById('tasks-container');
const filterButtons = document.querySelectorAll('.filter-btn');

// Task array to store tasks
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Initialize the app
function init() {
    renderTasks();
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    // Form submission for adding new task
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addTask();
    });
    
    // Filter buttons for task filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter tasks
            const filter = this.getAttribute('data-filter');
            renderTasks(filter);
        });
    });
}

// Add a new task
function addTask() {
    const title = taskTitleInput.value.trim();
    const description = taskDescriptionInput.value.trim();
    const dueDate = taskDueDateInput.value;
    const priority = taskPrioritySelect.value;
    
    if (!title || !dueDate) {
        alert('Please fill in the title and due date.');
        return;
    }
    
    const newTask = {
        id: Date.now(), // Simple unique ID
        title,
        description,
        dueDate,
        priority,
        completed: false
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    
    // Reset form
    taskForm.reset();
    taskPrioritySelect.value = 'medium'; // Reset to default
}

// Render tasks based on filter
function renderTasks(filter = 'all') {
    tasksContainer.innerHTML = '';
    
    let filteredTasks = tasks;
    if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    if (filteredTasks.length === 0) {
        tasksContainer.innerHTML = '<p class="no-tasks">No tasks found. Add a new task!</p>';
        return;
    }
    
    filteredTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        tasksContainer.appendChild(taskElement);
    });
}

// Create a task element
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.priority} ${task.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', task.id);
    
    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';
    
    const title = document.createElement('h3');
    title.textContent = task.title;
    
    const description = document.createElement('p');
    description.textContent = task.description || 'No description provided.';
    
    const dueDate = document.createElement('p');
    dueDate.className = 'due-date';
    dueDate.textContent = `Due: ${new Date(task.dueDate).toLocaleDateString()}`;
    
    const priority = document.createElement('p');
    priority.textContent = `Priority: ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`;
    
    taskContent.appendChild(title);
    taskContent.appendChild(description);
    taskContent.appendChild(dueDate);
    taskContent.appendChild(priority);
    
    const taskActions = document.createElement('div');
    taskActions.className = 'task-actions';
    
    const completeButton = document.createElement('button');
    completeButton.className = 'complete-btn';
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';
    completeButton.addEventListener('click', () => toggleTaskCompletion(task.id));
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(task.id));
    
    taskActions.appendChild(completeButton);
    taskActions.appendChild(deleteButton);
    
    li.appendChild(taskContent);
    li.appendChild(taskActions);
    
    return li;
}

// Toggle task completion status
function toggleTaskCompletion(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

// Delete a task
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);