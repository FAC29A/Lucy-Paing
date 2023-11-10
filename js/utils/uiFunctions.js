import { toDoList, saveTasks } from "./storage.js";
import { completeTask, deleteTask, reorderTasks } from "./taskFunctions.js";

export function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear current tasks

  toDoList.forEach((task, index) => {
    const taskElement = createTaskElement(task, index);
    taskList.appendChild(taskElement);
  });

  toggleTaskListVisibility();
}

function createTaskElement(task, index) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item"); // Add class for styling and drag & drop

  // Create task elements
  const checkbox = createCheckbox(task, index);
  const label = createLabel(task, index); // Pass index for inline editing
  const priorityDropdown = createPriorityDropdown(index);
  const deleteButton = createDeleteButton(index);


  // Append elements in correct order for styling
  taskItem.appendChild(checkbox);
  taskItem.appendChild(label);
  taskItem.appendChild(priorityDropdown);
  taskItem.appendChild(deleteButton);

  // Set the initial value for the priority dropdown
  if (task.priority) {
  priorityDropdown.value = task.priority.toLowerCase();
  }

  // Set up drag & drop
  setUpDragAndDrop(taskItem, index);
  // Set up click event for the task item
  taskItem.addEventListener("click", () => {
    label.contentEditable = "true";
    label.focus();
  });


  // Prevent activating edit mode when clicking on checkbox or deleteButton
  checkbox.addEventListener("click", (event) => event.stopPropagation());
  deleteButton.addEventListener("click", (event) => event.stopPropagation());
  priorityDropdown.addEventListener("click", (event) => event.stopPropagation());

  return taskItem;
}

function createCheckbox(task, index) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => {
    completeTask(index);
    displayTasks();
  });
  return checkbox;
}

function createLabel(task, index) {
  const label = document.createElement("label");
  label.textContent = task.text;
  label.contentEditable = "false"; // Changed to false by default
  label.classList.add("task-label");

  label.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      task.text = label.textContent;
      saveTasks(); // Save the edited text
      label.contentEditable = "false"; // Change to false after editing
      label.blur();
    }
  });

  if (task.completed) {
    label.classList.add("completed");
  }

  return label;
}

// Add a priority dropdown
function createPriorityDropdown(index) {
  const priorityDropdown = document.createElement("select");
  priorityDropdown.classList.add("priority-dropdown");

  // Define priority options
  const priorityOptions = ["Low", "Medium", "High"];

  // Create and append option elements
  priorityOptions.forEach((priority) => {
    const option = document.createElement("option");
    option.value = priority.toLowerCase();
    option.text = priority;
    priorityDropdown.appendChild(option);
  });

  // Add event listener to handle priority change
  priorityDropdown.addEventListener("change", () => {
    const selectedPriority = priorityDropdown.value;
    console.log(`Selected Priority: ${selectedPriority}`);
    updatePriority(index, selectedPriority);
    displayTasks();
  });

  return priorityDropdown;
}

// Function to update task priority in your data structure
function updatePriority(index, priority) {
  console.log(`Updating Priority for Task at Index ${index} to ${priority}`)
  toDoList[index].priority = priority;
  saveTasks()
}


// Add a "Delete" button
function createDeleteButton(index) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-btn");
  deleteButton.addEventListener("click", function () {
    deleteTask(index);
    displayTasks();
  });
  return deleteButton;
}

// Drag & drop
function setUpDragAndDrop(taskItem, index) {
  taskItem.draggable = true;
  taskItem.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", index);
  });

  taskItem.addEventListener("dragover", (event) => {
    event.preventDefault(); // Necessary to allow dropping
  });

  taskItem.addEventListener("drop", (event) => {
    event.preventDefault();
    const originIndex = event.dataTransfer.getData("text/plain");
    const destIndex = index;
    // Function to reorder tasks
    reorderTasks(originIndex, destIndex);
    displayTasks();
  });
}

// Hide or show the task list wrapper based on the number of tasks
function toggleTaskListVisibility(display) {
  const taskListWrapper = document.getElementById("taskListWrapper");
  if (toDoList.length > 0) {
    taskListWrapper.style.display = "block";
  } else {
    taskListWrapper.style.display = "none";
  }
}
