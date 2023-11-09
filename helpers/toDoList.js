import { displayTasks } from "/script.js";

export const toDoList = [];


export function saveTasks() {
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

export function loadTasks() {
  const storedTasks = localStorage.getItem("toDoList");
  if (storedTasks) {
    toDoList.push(...JSON.parse(storedTasks));
  }
  displayTasks();
}