import { equal, test } from "./test-helpers.js";
import { toDoList } from "../js/utils/storage.js";
import {
  addTask,
  completeTask,
  deleteTask,
  clearCompletedTasks
} from "../js/utils/taskFunctions.js";
import { displayTasks } from "../js/utils/uiFunctions.js";

const runTests = () => {
  test("Submitting a new task adds it to the list", () => {
    // Arrange
    const initialTaskCount = toDoList.length;
    const newTaskText = "New Task";

    // Act
    addTask({ text: newTaskText, completed: false });

    // Assert
    equal(
      toDoList.length,
      initialTaskCount + 1,
      "Task count should increase by 1"
    );
    equal(
      toDoList[toDoList.length - 1].text,
      newTaskText,
      "New task text should match"
    );

    // Test adding a task with only whitespace
    addTask({ text: "   ", completed: false }); // Task with only whitespace
    equal(
      toDoList.length,
      initialTaskCount + 1, // The count should remain the same
      "Task count should not increase when adding a whitespace-only task"
    );
  });


  test("Checking an entry marks it as complete", () => {
    // Arrange: Add a task
    addTask({ text: "Complete Me", completed: false });
    const taskIndex = toDoList.length - 1;

    // Act: Complete the task
    completeTask(taskIndex);

    // Assert: Check if the task is marked as completed
    equal(
      toDoList[taskIndex].completed,
      true,
      "Task should be marked as completed"
    );

  });

  test("Deleting an entry removes it from the list", () => {
    // Arrange: Add a task and get its index
    addTask({ text: "Delete Me", completed: false });
    const initialLength = toDoList.length;

    // Act: Simulate clicking the delete button
    deleteTask(initialLength - 1); // Delete the last task

    // Assert: Check if the task is removed from the list
    equal(
      toDoList.length,
      initialLength - 1,
      "Task count should decrease by 1"
    );
    equal(
      toDoList.findIndex((task) => task.text === "Delete Me"),
      -1,
      "Task 'Delete Me' should be removed from the list."
    );

  });


  test("Display tasks based on priority filter", () => {
    // Arrange
    toDoList.length = 0; // Reset the toDoList to ensure test isolation
    addTask({ text: "Low Priority", priority: "Low", completed: false });
    addTask({ text: "High Priority", priority: "High", completed: false });
    document.getElementById("priorityFilter").value = "all";

    // Act
    displayTasks();

    // Assert
    const taskList = document.getElementById("taskList");
    const displayedTasks = taskList.querySelectorAll("li");

    // The expected count should be the total number of tasks, since the filter is set to 'all'
    const expectedCount = toDoList.length;

    equal(
      displayedTasks.length,
      expectedCount,
      "All tasks should be displayed when filter is set to 'all'"
    );
    // Cleanup
    toDoList.length = 0; // Clear the toDoList
    localStorage.removeItem("toDoList"); // Clear the tasks from local storage
  });


  test("Clearing completed tasks", () => {
    // Arrange
    toDoList.length = 0; // Reset the toDoList for isolation
    addTask({ text: "Task to be completed", priority: "Low", completed: true });
    addTask({ text: "Task to remain", priority: "High", completed: false });

    // Act
    clearCompletedTasks();

    // Assert
    equal(toDoList.length, 1, "Only incomplete tasks should remain");
    equal(
      toDoList[0].text,
      "Task to remain",
      "Remaining task should be the incomplete one"
    );
    // Cleanup
    toDoList.length = 0; // Clear the toDoList
    localStorage.removeItem("toDoList"); // Clear the tasks from local storage
  });


//   test("Deleting a specific task", () => {
//     // Arrange
//     toDoList.length = 0; // Reset the toDoList for isolation
//     addTask({ text: "Task 1", priority: "Low", completed: false });
//     addTask({
//       text: "Don't worry! Be Happy! 😊 ",
//       priority: "High",
//       completed: false,
//     });
//     const deleteIndex = toDoList.findIndex((task) => task.text === "Task 1");

//     // Act
//     deleteTask(deleteIndex);

//     // Assert
//     equal(
//       toDoList.findIndex((task) => task.text === "Task 1"),
//       -1,
//       "Task 1 should be deleted"
//     );
//     equal(toDoList.length, 1, "Only one task should remain after deletion");

//     // Cleanup
//     toDoList.length = 0; // Clear the toDoList
//     localStorage.removeItem("toDoList"); // Clear the tasks from local storage
//   });
};

runTests();
