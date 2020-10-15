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

    let submitModeInput = document.querySelector('#submitMode');
    let nameInput = document.querySelector('#TaskName');
    let descriptionInput = document.querySelector('#Description');
    let assignedToInput = document.querySelector('#Assignee');
    let dueDateInput = document.querySelector('#DueDate');
    let statusInput = document.querySelector('#Status'); 

    let submitMode = submitModeInput.value;
    let name = nameInput.value;
    let description = descriptionInput.value;
    let assignedTo = assignedToInput.value;
    let dueDate = dueDateInput.value;
    let status = statusInput.value
    
    if (submitMode == "true")
    {
      // you're in submit mode

      submitForm(name, description, assignedTo, dueDate, status);
    }
    else
    {
      // you're in update mode
      taskId = document.querySelector('#currentTaskId').value;
      updateForm(taskId,name, description, assignedTo, dueDate, status);
      document.querySelector('#submitMode').value = "false";
    }

      // Clear the form
      nameInput.value = '';
      descriptionInput.value = '';
      assignedToInput.value = '';
      dueDateInput.value = '';
      statusInput.value = ''; 

  });

  function validateTaskForm (name, description, assignedTo, dueDate, status){

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

function updateForm(taskId,name, description, assignedTo, dueDate, status){
  if (validateTaskForm(name, description, assignedTo, dueDate, status)){
      taskManager.updateTask(taskId,name, description, assignedTo, dueDate, status); 
  }

  // Save the tasks to localStorage
  taskManager.save();

  // Render the tasks
  taskManager.render();

  document.querySelector("#magic").play(); 

}

function submitForm(name, description, assignedTo, dueDate, status){
  if (validateTaskForm(name, description, assignedTo, dueDate, status)){
      taskManager.addTask(name, description, assignedTo, dueDate, status); 
  }

  // Save the tasks to localStorage
  taskManager.save();

  // Render the tasks
  taskManager.render();

  document.querySelector("#magic").play(); 

}

function refreshForm(task){
  let submitButton = document.querySelector('#submitButton');
  let name = document.querySelector('#TaskName');
  let description = document.querySelector('#Description');
  let assignedTo = document.querySelector('#Assignee');
  let dueDate = document.querySelector('#DueDate');
  let status = document.querySelector('#Status'); 

  name.value = task.name;
  description.value = task.description;
  assignedTo.value = task.assignedTo;
  dueDate.value = task.dueDate;
  status.value = task.status;
  submitButton.innerHTML = "Save";

};

const tasksList = document.querySelector('#tasksList');

tasksList.addEventListener('click', (event) => {

    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement;
        const taskId = Number(parentTask.dataset.taskId); 
        const task = taskManager.getTaskById(taskId);
        task.status = "DONE";
        taskManager.save();
        taskManager.render();
        document.querySelector("#applause").play();
    }

    if (event.target.classList.contains('delete-button')) {
        const parentTask = event.target.parentElement.parentElement;
        const taskId = Number(parentTask.dataset.taskId);
        taskManager.deleteTask(taskId);
        taskManager.save();
        taskManager.render();
        document.querySelector("#shred").play(); 

    }
    
    if (event.target.classList.contains('update-button')) {
        document.querySelector('#submitMode').value = "false";
        const parentTask = event.target.parentElement.parentElement;
        const taskId = Number(parentTask.dataset.taskId);
        const task = taskManager.getTaskById(taskId);
        document.querySelector('#currentTaskId').value = taskId;
        refreshForm(task);
        document.querySelector("#gasp").play(); 
        
    } 
});


