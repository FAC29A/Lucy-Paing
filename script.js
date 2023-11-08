// Define an array to store the to-do list items
const toDoList = [];

// Function to save the state of toDoList to local storage
function saveTasks() {
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

// Function to load tasks from local storage
function loadTasks() {
  const storedTasks = localStorage.getItem("toDoList");
  if (storedTasks) {
    toDoList.push(...JSON.parse(storedTasks));
  }
  displayTasks(); // Update the UI with stored tasks
}

// Modify existing functions to call saveTasks after changes
function addTask(task) {
  toDoList.push(task);
  saveTasks();
}

function completeTask(i) {
  if (i >= 0 && i < toDoList.length) {
    toDoList[i].completed = !toDoList[i].completed; // Toggle completion
    saveTasks();
  }
}

function deleteTask(i) {
  if (i >= 0 && i < toDoList.length) {
    toDoList.splice(i, 1);
    saveTasks();
  }
}

function reorderTasks(originIndex, destIndex) {
  const itemToMove = toDoList.splice(originIndex, 1)[0];
  toDoList.splice(destIndex, 0, itemToMove);
  saveTasks();
}

// Example usage:
// addTask({ text: "Buy groceries", completed: false });
// addTask({ text: "Do laundry", completed: false });
// completeTask(0);
// deleteTask(1);

console.log(toDoList);

const toDoForm = document.getElementById("toDoForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

toDoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = taskInput.value;
  if (taskText.trim() !== "") {
    addTask({ text: taskText, completed: false });
    taskInput.value = "";
    displayTasks();
  }
});

// Function to display tasks
function displayTasks() {
  const completedTasks = [];
  const uncompletedTasks = [];

  for (let i = 0; i < toDoList.length; i++) {
    const task = toDoList[i];

    if (task.completed) {
      completedTasks.push(task);
    } else {
      uncompletedTasks.push(task);
    }
  }

  // Hide or show the task list wrapper based on the number of tasks
  const taskListWrapper = document.getElementById("taskListWrapper");
  if (toDoList.length > 0) {
    taskListWrapper.style.display = "block";
  } else {
    taskListWrapper.style.display = "none";
  }

  // Clear the task list
  taskList.innerHTML = "";

  // Display uncompleted tasks first
  // uncompletedTasks.forEach(function (task, i) {
  //   displayTaskItem(task, i);
  // });

  // Display completed tasks at the bottom
  // completedTasks.forEach(function (task, i) {
  //   displayTaskItem(task, i + uncompletedTasks.length);
  // });

  // Display tasks maintaining their order
  toDoList.forEach(function (task, i) {
    displayTaskItem(task, i);
  });
}

function displayTaskItem(task, index) {
  const taskItem = document.createElement("li");

  // Container for checkbox and label
  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");

  // Create a checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", function () {
    task.completed = checkbox.checked;
    displayTasks();
  });

  // Create a label for the task text
  const label = document.createElement("label");
  label.textContent = task.text;
  label.contentEditable = "false";

  taskItem.addEventListener("click", function () {
    label.contentEditable = "true";
    label.focus();
  });

  label.addEventListener("blur", function () {
    editTask(index, this.textContent);
    label.contentEditable = "false";
  });

  label.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      label.blur();
    }
  });

  // Append the checkbox and label to the task content container
  taskContent.appendChild(checkbox);
  taskContent.appendChild(label);

  // Add a "Delete" button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-btn");
  deleteButton.addEventListener("click", function () {
    deleteTask(index);
    displayTasks();
  });

  // Add classes for styling if the task is completed
  if (task.completed) {
    label.classList.add("completed");
  }

  // Append the task content and delete button to the task item
  taskItem.appendChild(taskContent);
  taskItem.appendChild(deleteButton);

  // Append the task item to the task list
  taskList.appendChild(taskItem);

  // Drag & drop
  taskItem.draggable = true;
  taskItem.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", index);
  });

  taskItem.addEventListener("drop", (event) => {
    event.preventDefault();
    const originIndex = event.dataTransfer.getData("text/plain");
    const destIndex = index;
    // Function to reorder tasks
    reorderTasks(originIndex, destIndex);
    displayTasks();
  });

  taskItem.addEventListener("dragover", (event) => {
    event.preventDefault(); // Necessary to allow dropping
  });
}

/* plan to add filtering or tagging, may not need to worry about moving completed tasks to the bottom,
as users will be able to filter out completed tasks if they wish. 
Tagging can allow users to organize tasks by category,priority,or due date,
which may be more useful than whether a task is completed or not. 
A “Show Completed” toggle could give users the control to hide or show completed tasks,
catering to both preferences. */

// Call loadTasks when the application starts
document.addEventListener("DOMContentLoaded", loadTasks);
