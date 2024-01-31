document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    const addButton = document.getElementById('btn_add');
    addButton.addEventListener('click', addTask);
  });
  
  function loadTasks() {
    // Servidor para obtener las tareas desde la base de datos
    
    const tasks = [];
  
    const app = document.getElementById('app');
    //app.innerHTML = '<h1>Contador de Tareas</h1>';
  
    tasks.forEach(task => {
      createTaskContainer(task);
    });
  }
  
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTaskTitle = taskInput.value;
  
    if (newTaskTitle.trim() !== '') {
      const newTask = { title: newTaskTitle, count: 0 };
      createTaskContainer(newTask);
  
      // Solicitud al servidor para agregar la tarea a la base de datos
  
      // Limpiar el campo de entrada después de agregar la tarea
      taskInput.value = '';
    }
  }
  
  function createTaskContainer(task) {
    const app = document.getElementById('app');
    const container = document.createElement('div');
    container.classList.add('task-container'); // Agregar clase para los estilos
  
    const button = document.createElement('button');
    button.textContent = task.title;
    button.onclick = () => incrementCount(task, countElement);
  
    const countElement = document.createElement('span');
    countElement.textContent = task.count;
    countElement.style.marginRight = '5px'; 
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.onclick = () => deleteTask(container);
  
    container.appendChild(button);
    container.appendChild(countElement);
    container.appendChild(deleteButton);
    app.appendChild(container);
  }
  
  function incrementCount(task, countElement) {
    task.count++;
    // Actualizar el texto con el nuevo conteo
    countElement.textContent = task.count;
    // Solicitud al servidor para actualizar la tarea en la base de datos
  }
  
  function deleteTask(container) {
    const app = document.getElementById('app');
    app.removeChild(container);
    // Solicitud al servidor para eliminar la tarea de la base de datos
  }
  