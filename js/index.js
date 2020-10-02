// Initialize a new TaskManager with currentId set to 0
const taskManager = new TaskManager(0);

// Load the tasks from localStorage
taskManager.load();

// Render the tasks to the page
taskManager.render();

// Select the New Task Form
const newTaskForm = document.querySelector('#builtin-form');

    newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let name = document.querySelector('#TaskName').value;
    let description = document.querySelector('#Description').value;
    let assignedTo = document.querySelector('#Assignee').value;
    let dueDate = document.querySelector('#DueDate').value;
    let status = document.querySelector('#Status').value; 

    // Validation code here
      let validateTaskForm = () => {
        if (name == "") {
          alert("Name of the task must be entered.");
          return false;
        } else if (name.length < 8) {
          alert("Name of the task must be longer than 8 characters!");
          return false;
        }

        if (description == "") {
          alert("Description of the task must be entered.");
          return false;
        } else if (description.length < 15) {
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

        return true;
      }

    if (validateTaskForm(name, description, assignedTo, dueDate, status)){
         taskManager.addTask(name, description, assignedTo, dueDate, status); 
    }

     // Save the tasks to localStorage
    taskManager.save();

    // Render the tasks
    taskManager.render();

    // Clear the form
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

    // Get the taskId of the parent Task.      
        const taskId = Number(parentTask.dataset.taskId);

    // Get the task from the TaskManager using the taskId      
        const task = taskManager.getTaskById(taskId);

   // Update the task status to 'DONE'
        task.status = "DONE";

    // Save the tasks to localStorage
        taskManager.save();

    // Render the tasks
        taskManager.render();
    }

    if (event.target.classList.contains('delete-button')) {
  // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;
  // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);
  // Delete the task
        taskManager.deleteTask(taskId);

   // Save the tasks to localStorage
        taskManager.save();

   // Render the tasks
        taskManager.render();

    }
});


