
let validateTaskForm = () => {
  var taskName = document.forms["updateForm"]["TaskName"].value;
  if (taskName == "") {
    alert("Name of the task must be entered.");
    return false;
  } else if (taskName.length <= 8) {
    alert("Name of the task must be longer than 8 characters!");
    return false;
  }

  var description = document.forms["updateForm"]["Description"].value;
  if (description == "") {
    alert("Description of the task must be entered.");
    return false;
  } else if (description.length <= 15) {
    alert("Description of the task must be longer than 15 characters!");
    return false;
  }

  var assignee = document.forms["updateForm"]["Assignee"].value;
  if (assignee == "") {
    alert("Please assign a person from the drop-down menu");
    return false;
  }

  var dueDate = document.forms["updateForm"]["DueDate"].value;
  if (dueDate == "") {
    alert("Due date of the task must be entered.");
    return false;
  }

  var status = document.forms["updateForm"]["Status"].value;
  if (status == "") {
    alert("Please select status from the drop-down menu.");
    return false;
  }
}