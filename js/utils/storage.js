export const toDoList = [];

export function saveTasks() {
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}
console.log(
  "Tasks in localStorage:",
  JSON.parse(localStorage.getItem("toDoList"))
);

export function loadTasks() {
  const storedTasks = localStorage.getItem("toDoList");
  if (storedTasks) {
    toDoList.push(...JSON.parse(storedTasks));
    toDoList.forEach((task) => {
      if (!task.hasOwnProperty("priority")) {
        task.priority = "Low"; // Set a default priority if needed
      }
    });
  }
}
