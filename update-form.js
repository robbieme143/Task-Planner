
let validateTaskForm = () => {
  var taskName = document.forms["updateForm"]["TaskName"].value;
  if (taskName == "") {
    alert("Task name must be entered");
    return false;
  } else if (taskName.length < 8) {
    alert("Task name must be longer than 8 characters!");
    return false;
  }

  var description = document.forms["updateForm"]["Description"].value;
  if (description == "") {
    alert("Task description must be entered");
    return false;
  } else if (taskName.length < 15) {
    alert("Task description must be longer than 15 characters!");
    return false;
  }

  var dueDate = document.forms["updateForm"]["DueDate"].value;
  if (dueDate == "") {
    alert("Date must be entered");
    return false;
  }
}