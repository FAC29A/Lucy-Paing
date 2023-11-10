import { toDoList } from "./toDoList.js";

export function addTask(task) {
  toDoList.push(task);
  saveTasks();
}

export function completeTask(i) {
  if (i >= 0 && i < toDoList.length) {
    toDoList[i].completed = !toDoList[i].completed; // Toggle completion
    saveTasks();
    displayTasks();
  }
}

export function deleteTask(i) {
  if (i >= 0 && i < toDoList.length) {
    toDoList.splice(i, 1);
    saveTasks();
  }
}

export function reorderTasks(originIndex, destIndex) {
  const itemToMove = toDoList.splice(originIndex, 1)[0];
  toDoList.splice(destIndex, 0, itemToMove);
  saveTasks();
}
