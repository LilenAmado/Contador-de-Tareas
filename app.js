document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    const addButton = document.getElementById('btn_add');
    addButton.addEventListener('click', addTask);
});

function loadTasks() {
    // Simular la obtención de tareas desde la base de datos
    const tasks = [];

    const app = document.getElementById('app');

    tasks.forEach(task => {
        createTaskContainer(task);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTaskTitle = taskInput.value.trim();

    if (newTaskTitle !== '') {
        const newTask = { id: Date.now(), title: newTaskTitle, count: 0 };
        createTaskContainer(newTask);

        // Limpiar el campo de entrada después de agregar la tarea
        taskInput.value = '';
    }
}

function createTaskContainer(task) {
    const app = document.getElementById('app');
    const container = document.createElement('div');
    container.classList.add('task-container');
    container.dataset.id = task.id;

    const titleElement = document.createElement('input');
    titleElement.type = 'text';
    titleElement.value = task.title;
    titleElement.classList.add('task-title');
    titleElement.disabled = true;

    const countElement = document.createElement('span');
    countElement.textContent = task.count;
    countElement.classList.add('task-count');

    const countButton = document.createElement('button');
    countButton.textContent = 'Contar';
    countButton.classList.add('count-btn');
    countButton.onclick = () => incrementCount(task, countElement);

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.classList.add('edit-btn');
    editButton.onclick = () => toggleEdit(task.id, titleElement, editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-btn');
    deleteButton.onclick = () => deleteTask(task.id);

    container.appendChild(titleElement);
    container.appendChild(countElement);
    container.appendChild(countButton);
    container.appendChild(editButton);
    container.appendChild(deleteButton);
    app.appendChild(container);
}

function toggleEdit(taskId, titleElement, editButton) {
    titleElement.disabled = !titleElement.disabled;
    titleElement.focus();

    if (!titleElement.disabled) {
        editButton.textContent = 'Guardar';
    } else {
        editButton.textContent = 'Editar';
    }
}

function incrementCount(task, countElement) {
    task.count++;
    countElement.textContent = task.count;
}

function deleteTask(taskId) {
    const taskElement = document.querySelector(`.task-container[data-id="${taskId}"]`);
    taskElement.remove();
}
