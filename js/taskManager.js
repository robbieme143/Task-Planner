const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => 
`   
    <li class="list-group-item list-group-item-primary  bg-primary text-white" text-white data-task-id=${id}>
        <div class="d-flex w-100 mt-1 justify-content-between ">
          <h5>${name}</h5>
          <span class="badge ${status === 'TODO' ? 'badge-danger' : 'badge-success'}">${status}</span>
        </div>
        <p class="d-flex w-100 mb-5 ">${description}</p>
        <div class="d-flex w-100 justify-content-between">
          <medium>${assignedTo}</medium>
          <medium>Due: ${dueDate}</medium>
        </div>

        <div class="d-flex w-100 justify-content-between">
          <button class="btn btn-danger delete-button">Delete</button>
          <audio id="shred" src="sounds/shred.mp3"></audio>
          <button class="btn btn-secondary update-button ${(status === 'TODO') || (status === 'REVIEW') || (status === 'IN PROGRESS') ? 'visible' : 'invisible'}" onclick="window.location.href='#builtin-form'" >Update</button>
          <audio id="gasp" src="sounds/gasp.mp3"></audio>
          <button class="btn btn-outline-dark bg-warning text-white done-button ${(status === 'TODO') || (status === 'REVIEW') || (status === 'IN PROGRESS') ? 'visible' : 'invisible'}">Mark As Done</button>
          <audio id="applause" src="sounds/applause.mp3"></audio>
        </div>
    </li>
    <audio id="magic" src="sounds/magic.mp3"></audio>
    <br>
`;

class TaskManager {

  constructor(currentId = 0){
      this.tasks = [];
      this.currentId = currentId;
  }

  addTask(name, description, assignedTo, dueDate,status){
      const task = {
          id: this.currentId++,  
          name: name,
          description: description,
          assignedTo: assignedTo,
          dueDate: dueDate,
          status: status

      }
      this.tasks.push(task);
  }

  updateTask(id,name, description, assignedTo, dueDate,status){

    let task = this.getTaskById(id);
    task.name = name;
    task.description = description;
    task.assignedTo = assignedTo;
    task.dueDate = dueDate;
    task.status = status;
  }

  getTaskById(taskId) {
 // Create a variable to store the found task
    let foundTask;

    for (let i = 0; i < this.tasks.length; i++) {
    // Get the current task in the loop
        const task = this.tasks[i];
      // Check if its the right task by comparing the task's id to the id passed as a parameter
         if (task.id == taskId) {
      // Store the task in the foundTask variable       
            foundTask = task;
        }
    }
    // Return the found task
    return foundTask;
}

  save() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem('tasks',tasksJson);

    const currentId = String(this.currentId);
    localStorage.setItem('currentId', currentId);
  }

  load() {
      if (localStorage.getItem('tasks')) {
        const tasksJson = localStorage.getItem('tasks');
        this.tasks = JSON.parse(tasksJson);
      }

      if (localStorage.getItem('currentId')){
        const currentId = localStorage.getItem('currentId');
        this.currentId = Number(currentId);
      }
  }

  deleteTask (taskId) {
        const newTasks = [];

        for (let i=0 ; i < this.tasks.length; i++) {
            const task = this.tasks[i];
      // Check if the task id is not the task id passed in as a parameter
            if (task.id !== taskId) {
      // Push the task to the newTasks array
                newTasks.push(task);
   
            }       
        }
      // Set this.tasks to newTasks
        this.tasks = newTasks;    
  }

  render() {

      // Create an array to store the tasks' HTML
    const tasksHtmlList = [];
      // Loop over our tasks and create the html, storing it in the array
    for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];

        const date = new Date(task.dueDate);
        const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

        const taskHtml = createTaskHtml(task.id, task.name, task.description, task.assignedTo, formattedDate, task.status);
     // Push it to the tasksHtmlList array
        tasksHtmlList.push(taskHtml);
    }
     // Create the tasksHtml by joining each item in the tasksHtmlList
     // with a new line in between each item.
    const tasksHtml = tasksHtmlList.join('\n');

    const tasksList = document.querySelector('#tasksList');
    tasksList.innerHTML = tasksHtml;
  }
}
