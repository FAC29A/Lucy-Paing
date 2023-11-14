import { toDoList, saveTasks } from "./storage.js";

export function addTask(task) {
  console.log("Adding task:", task); // Debugging statement
  if (task.text.trim() !== "") {
    toDoList.push(task);
    saveTasks();
  }
}


export function completeTask(index) {
  if (index >= 0 && index < toDoList.length) {
    toDoList[index].completed = !toDoList[index].completed;
    saveTasks();
  }
}

export function deleteTask(index) {
  if (index >= 0 && index < toDoList.length) {
    toDoList.splice(index, 1);
    saveTasks();
  }
}

export function reorderTasks(originIndex, destIndex) {
  const item = toDoList.splice(originIndex, 1)[0];
  toDoList.splice(destIndex, 0, item);
  saveTasks();
}

export function clearCompletedTasks() {
  for (let i = toDoList.length - 1; i >= 0; i--) {
    if (toDoList[i].completed) {
      toDoList.splice(i, 1);
    }
  }
  saveTasks();
}