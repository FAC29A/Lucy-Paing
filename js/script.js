import { toDoList, loadTasks } from "./utils/storage.js";
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

toDoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = taskInput.value;
  if (taskText.trim() !== "") {
    addTask({ text: taskText, completed: false });
    taskInput.value = "";
    displayTasks();
  }
});
