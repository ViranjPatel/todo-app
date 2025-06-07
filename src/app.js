// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearCompletedBtn = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');
const noTasksMessage = document.getElementById('noTasksMessage');

// State
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// Functions
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'task-delete';
    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'material-icons';
    deleteIcon.textContent = 'delete';
    deleteBtn.appendChild(deleteIcon);
    
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    
    return li;
}

function renderTasks() {
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true; // 'all' filter
    });

    if (filteredTasks.length === 0) {
        noTasksMessage.classList.remove('hidden');
    } else {
        noTasksMessage.classList.add('hidden');
    }

    filteredTasks.forEach(task => {
        taskList.appendChild(createTaskElement(task));
    });
    
    updateTaskCount();
}

function updateTaskCount() {
    const activeTasks = tasks.filter(task => !task.completed).length;

    // Ensure proper singular/plural grammar
    if (activeTasks === 1) {
        taskCount.textContent = '1 task left';
    } else {
        taskCount.textContent = `${activeTasks} tasks left`;
    }
}

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;
    
    const newTask = {
        id: Date.now().toString(),
        text,
        completed: false
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    const li = taskList.lastElementChild;
    if (li) {
        li.classList.add('new');
        setTimeout(() => li.classList.remove('new'), 300);
    }
    
    taskInput.value = '';
    taskInput.focus();
}

function toggleTaskCompletion(id) {
    tasks.forEach(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
    });

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    const li = taskList.querySelector(`[data-id="${id}"]`);
    if (li) {
        li.classList.add('removing');
        setTimeout(() => {
            const remaining = tasks.filter(task => task.id !== id);
            tasks.length = 0;
            tasks.push(...remaining);
            saveTasks();
            renderTasks();
        }, 200);
    } else {
        const remaining = tasks.filter(task => task.id !== id);
        tasks.length = 0;
        tasks.push(...remaining);
        saveTasks();
        renderTasks();
    }
}

function clearCompleted() {
    const completedItems = taskList.querySelectorAll('.task-item.completed');
    completedItems.forEach(li => li.classList.add('removing'));
    const remove = () => {
        const filtered = tasks.filter(task => !task.completed);
        tasks.length = 0;
        tasks.push(...filtered);
        saveTasks();
        renderTasks();
    };

    if (process.env.NODE_ENV === 'test') {
        remove();
    } else {
        setTimeout(remove, 200);
    }
}

function setFilter(filter) {
    currentFilter = filter;
    
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    renderTasks();
}

// Event Listeners
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

taskList.addEventListener('click', (e) => {
    const taskItem = e.target.closest('.task-item');
    if (!taskItem) return;
    
    const taskId = taskItem.dataset.id;
    
    if (e.target.classList.contains('task-checkbox')) {
        toggleTaskCompletion(taskId);
    } else if (e.target.closest('.task-delete')) {
        deleteTask(taskId);
    }
});

clearCompletedBtn.addEventListener('click', clearCompleted);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setFilter(btn.dataset.filter);
    });
});

// Initial render
renderTasks();

// Export functions for testing in Node environment
if (typeof module !== 'undefined') {
    module.exports = {
        addTask,
        clearCompleted,
        tasks,
        renderTasks
    };
}
