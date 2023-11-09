import { toDoList, loadTasks } from "./helpers/toDoList.js";
import {
    addTask,
    completeTask,
    deleteTask,
    reorderTasks,
} from "./helpers/taskFunctions.js";

// Call loadTasks when the application starts
document.addEventListener("DOMContentLoaded", loadTasks);

const toDoForm = document.getElementById("toDoForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

toDoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskText = taskInput.value;
    if (taskText.trim() !== "") {
        addTask({ text: taskText, completed: false });
        taskInput.value = "";
        displayTasks();
    }
});

// Hide or show the task list wrapper based on the number of tasks
export function toggleTaskListVisibility(display) {
    const taskListWrapper = document.getElementById("taskListWrapper");
    if (toDoList.length > 0) {
        taskListWrapper.style.display = "block";
    } else {
        taskListWrapper.style.display = "none";
    }
}
// Clear the task list
function clearTaskList() {
    taskList.innerHTML = "";
}

// Display tasks maintaining their order
function populateTaskList(tasks) {
    tasks.forEach((task, i) => displayTaskItem(task, i));
}

// Function to display tasks
export function displayTasks() {
    toggleTaskListVisibility(toDoList.length > 0);
    clearTaskList();
    populateTaskList(toDoList);
}

// Create a checkbox
function createCheckbox(task, index) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => completeTask(index));
    return checkbox;
}

// Create a label for the task text
function createTaskLabel(task, index) {
    const label = document.createElement("label");
    label.textContent = task.text;
    label.contentEditable = "false";

    return label;
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


function appendElementsToTaskItem(taskItem, elements) {
    elements.forEach((element) => taskItem.appendChild(element));
}


function displayTaskItem(task, index) {
    const taskItem = document.createElement("li");
    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const checkbox = createCheckbox(task, index);
    const label = createTaskLabel(task, index);
    const deleteButton = createDeleteButton(index);

    taskItem.addEventListener("click", function () {
        label.contentEditable = "true";
        label.focus();
    });

    label.addEventListener("blur", function () {
        label.contentEditable = "false";
    });

    label.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            label.blur();
        }
    });

    appendElementsToTaskItem(taskContent, [checkbox, label]);
    appendElementsToTaskItem(taskItem, [taskContent, deleteButton]);
    setUpDragAndDrop(taskItem, index);

    if (task.completed) {
        label.classList.add("completed");
    }

    taskList.appendChild(taskItem);
}
/* plan to add filtering or tagging, may not need to worry about moving completed tasks to the bottom,
as users will be able to filter out completed tasks if they wish. 
Tagging can allow users to organize tasks by category,priority,or due date,
which may be more useful than whether a task is completed or not. 
A “Show Completed” toggle could give users the control to hide or show completed tasks,
catering to both preferences. */
