import { toDoList, loadTasks } from "./utils/storage.js";
import { addTask } from "./utils/taskFunctions.js";
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
