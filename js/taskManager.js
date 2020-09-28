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
            <button class="btn btn-outline-dark bg-warning text-white done-button ${status === 'TODO' ? 'visible' : 'invisible'}">Mark As Done</button>
        </div>
    </li>
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

  getTaskById(taskId) {

    let foundTask;

    for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];

         if (task.id === taskId) {
            foundTask = task;
        }
    }

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

            if (task.id !== taskId) {
                newTasks.push(task);
            }       
        }
        this.tasks = newTasks;    
  }


  render() {

    const tasksHtmlList = [];

    for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];

        const date = new Date(task.dueDate);
        const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

        const taskHtml = createTaskHtml(task.id, task.name, task.description, task.assignedTo, formattedDate, task.status);

        tasksHtmlList.push(taskHtml);
    }

    const tasksHtml = tasksHtmlList.join('\n');

    const tasksList = document.querySelector('#tasksList');
    tasksList.innerHTML = tasksHtml;
  }
}
