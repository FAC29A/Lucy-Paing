import { toDoList, loadTasks, saveTasks } from "./utils/storage.js";
import {
  addTask,
  completeTask,
  deleteTask,
  reorderTasks,
} from "./utils/taskFunctions.js";
import { displayTasks } from "./utils/uiFunctions.js";

// Load tasks on start
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  displayTasks();
});

const toDoForm = document.getElementById("toDoForm");
const taskInput = document.getElementById("taskInput");
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  if (toDoList.length === 0 && searchInput.value.trim() !== "") {
    alert("Please add a task before searching.");
    searchInput.value = ""; // Clear the search input
  } else {
    displayTasks(); // Perform the search if tasks are present
  }
});

toDoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = taskInput.value;
  if (taskText.trim() !== "") {
    addTask({ text: taskText, completed: false });
    taskInput.value = "";
    displayTasks();
  }
});

// New function to clear completed tasks
function clearCompletedTasks() {
  for (let i = toDoList.length - 1; i >= 0; i--) {
    if (toDoList[i].completed) {
      toDoList.splice(i, 1);
    }
  }
  saveTasks();
  displayTasks();
}

// Event listener for clearing completed tasks
const clearCompletedBtn = document.getElementById("clearCompletedTasks");
clearCompletedBtn.addEventListener("click", function () {
  clearCompletedTasks();
});
