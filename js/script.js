import { toDoList, loadTasks } from "./utils/storage.js";
import { addTask, clearCompletedTasks } from "./utils/taskFunctions.js";
import { displayTasks } from "./utils/uiFunctions.js";

// Load tasks on start
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  displayTasks();
});

// Add event listener for logo click
const logo = document.getElementById("logo");
logo.addEventListener("click", () => {
  window.location.reload();
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
  const warningMessage = document.getElementById("taskInputWarning");

  if (taskText.trim() === "") {
    warningMessage.style.visibility = "visible"; // Make the warning visible
    warningMessage.style.opacity = 1; // Make the warning fully opaque

    setTimeout(() => {
      warningMessage.style.opacity = 0; // Gradually fade out the warning
      warningMessage.style.visibility = "hidden"; // Hide the warning after fade out
    }, 3000);
  } else {
    warningMessage.style.visibility = "hidden";
    warningMessage.style.opacity = 0;
    addTask({ text: taskText, completed: false });
    taskInput.value = "";
    displayTasks();
  }
});

// Event listener for clearing completed tasks
const clearCompletedBtn = document.getElementById("clearCompletedTasks");
clearCompletedBtn.addEventListener("click", function () {
  clearCompletedTasks();
  displayTasks();
});
