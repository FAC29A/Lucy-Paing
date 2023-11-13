import { toDoList, saveTasks } from "./storage.js";
import { completeTask, deleteTask, reorderTasks } from "./taskFunctions.js";

export function displayTasks() {
  const taskList = document.getElementById("taskList");
  const filter = document.getElementById("priorityFilter").value;
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const clearCompletedBtn = document.getElementById("clearCompletedTasks");
  // Check if there are completed tasks
  const hasCompletedTasks = toDoList.some((task) => task.completed);

  // Show or hide the clear completed tasks button
  clearCompletedBtn.style.display = hasCompletedTasks ? "block" : "none";

  taskList.innerHTML = ""; // Clear current tasks

  let hasMatches = false; // Variable to track if there are matching tasks

  toDoList.forEach((task, index) => {
    let shouldDisplay = false;

     // Handle filter logic
    switch (filter) {
      case "completed":
        shouldDisplay = task.completed;
        break;
      case "incomplete":
        shouldDisplay = !task.completed;
        break;
      default:
        const taskPriority = task.priority ? task.priority.toLowerCase() : null;
        shouldDisplay = 
          filter === "all" ||
          (filter === "" && taskPriority === null) ||
          filter === taskPriority;
        break;
    }

   // Apply search text filter
    shouldDisplay = shouldDisplay && task.text.toLowerCase().includes(searchText);


    // Display task if it meets the criteria
    if (shouldDisplay) {
      const taskElement = createTaskElement(task, index);
      taskList.appendChild(taskElement);
      hasMatches = true;
    }
  });

  // Display a message if no tasks match
  if (!hasMatches && searchText) {
    const noTaskMessage = document.createElement("p");
    noTaskMessage.innerHTML = `⚠️ No matches found for <strong>'${searchText}'</strong>.`;
    noTaskMessage.style.textAlign = "center";
    taskList.appendChild(noTaskMessage);
  }

  toggleTaskListVisibility();
}

// priority color dot
function createPriorityDot(priority) {
  const dot = document.createElement("span");
  dot.classList.add("priority-dot");
  if (priority) {
    dot.classList.add(`priority-${priority.toLowerCase()}`);
  } else {
    dot.classList.add("priority-none");
  }
  return dot;
}

function createTaskElement(task, index) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");

  // Create task elements
  const checkbox = createCheckbox(task, index);
  const priorityDot = createPriorityDot(task.priority);
  const label = createLabel(task, index);
  // Clone the priority dot for mobile view
  const priorityDotMobile = priorityDot.cloneNode(true);
  priorityDotMobile.classList.add("priority-dot-mobile"); // Add the mobile-specific class
  const priorityDropdown = createPriorityDropdown(index);
  const deleteButton = createDeleteButton(index);

  // Create a container for the left-side elements
  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");

  // Create a container for the priority dropdown and delete button
  const actionContainer = document.createElement("div");
  actionContainer.classList.add("action-container");

  // Append elements to their respective containers
  taskContent.appendChild(priorityDot);
  taskContent.appendChild(checkbox);
  taskContent.appendChild(label);

  actionContainer.appendChild(priorityDotMobile); // Cloned dot for mobile
  actionContainer.appendChild(priorityDropdown);
  actionContainer.appendChild(deleteButton);

  // Append the containers to the taskItem
  taskItem.appendChild(taskContent);
  taskItem.appendChild(actionContainer);

  // Set the initial value for the priority dropdown
  if (task.priority) {
    priorityDropdown.value = task.priority.toLowerCase();
  }

  // Set up drag & drop
  setUpDragAndDrop(taskItem, index);
  // Prevent activating edit mode when clicking on checkbox or deleteButton
  checkbox.addEventListener("click", (event) => event.stopPropagation());
  deleteButton.addEventListener("click", (event) => event.stopPropagation());
  priorityDropdown.addEventListener("click", (event) =>
    event.stopPropagation()
  );

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
  checkbox.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent event from bubbling up
  });
  return checkbox;
}

function createLabel(task, index) {
  const label = document.createElement("label");
  label.textContent = task.text;
  label.contentEditable = "false"; // Initially not editable
  label.classList.add("task-label");

  label.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      label.contentEditable = "false"; // Disable editing on Enter
      label.blur(); // Remove focus from the label
      task.text = label.textContent; // Update the task text
      saveTasks(); // Save the edited text
    }
  });

  // Add click event listener to enable editing
  label.addEventListener("click", () => {
    label.contentEditable = "true";
    label.focus();
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

  // Add a placeholder option
  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.text = "Priority";
  placeholderOption.disabled = true;
  placeholderOption.selected = true;
  priorityDropdown.appendChild(placeholderOption);

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
  console.log(`Updating Priority for Task at Index ${index} to ${priority}`);
  toDoList[index].priority = priority;
  saveTasks();
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

// Event listener for the priority filter dropdown
document
  .getElementById("priorityFilter")
  .addEventListener("change", displayTasks);

// Event listener for the search input field
document.getElementById("searchInput").addEventListener("input", displayTasks);
