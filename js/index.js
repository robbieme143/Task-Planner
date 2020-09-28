const taskManager = new TaskManager(0);

taskManager.load();

taskManager.render();


const newTaskForm = document.querySelector('#builtin-form');

    newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let name = document.querySelector('#TaskName').value;
    let description = document.querySelector('#Description').value;
    let assignedTo = document.querySelector('#Assignee').value;
    let dueDate = document.querySelector('#DueDate').value;
    let status = document.querySelector('#Status').value; 


      let validateTaskForm = () => {
        if (name == "") {
          alert("Name of the task must be entered.");
          return false;
        } else if (name < 8) {
          alert("Name of the task must be longer than 8 characters!");
          return false;
        }

        if (description == "") {
          alert("Description of the task must be entered.");
          return false;
        } else if (description < 15) {
          alert("Description of the task must be longer than 15 characters!");
          return false;
        }

        if (assignedTo == "") {
          alert("Please assign a person from the drop-down menu");
          return false;
        }

        if (dueDate == "") {
          alert("Due date of the task must be entered.");
          return false;
        }

        if (status == "") {
          alert("Please select status from the drop-down menu.");
          return false;
        }
      }

    validateTaskForm(name, description, assignedTo, dueDate, status);

    taskManager.addTask(name, description, assignedTo, dueDate, status); 

    taskManager.save();

    taskManager.render();

    name = '';
    description = '';
    assignedTo = '';
    dueDate = '';
    status = '';  

  });


const tasksList = document.querySelector('#tasksList');

tasksList.addEventListener('click', (event) => {

    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement;
        const taskId = Number(parentTask.dataset.taskId);
        const task = taskManager.getTaskById(taskId);

        task.status = "DONE";

        taskManager.save();

        taskManager.render();
    }

    if (event.target.classList.contains('delete-button')) {

        const parentTask = event.target.parentElement.parentElement;

        const taskId = Number(parentTask.dataset.taskId);

        taskManager.deleteTask(taskId);

        taskManager.save();

        taskManager.render();

    }
});


