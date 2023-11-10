import { equal, notEqual, test } from "/testing/test-helpers.js";
import { toDoList } from "/js/utils/storage.js";
import { addTask, completeTask } from "/js/utils/taskFunctions.js";

const runTests = () => {
    // test("Submitting a new task adds it to the list", () => {
    //     // Arrange: Ensure the task list is initially empty
    //     toDoList.length = 0;

    //     // Act: Simulate submitting a new task
    //     const taskInput = document.getElementById("taskInput");
    //     taskInput.value = "New Task";

    //     const submitButton = document.getElementById("submit-btn"); // Adjust the ID based on your actual submit button ID
    //     submitButton.click();

    //     // Assert: Check if the new task is added to the list
    //     equal(toDoList.length, 1, "Task should be added to the list");
    //     equal(toDoList[0].text, "New Task", "Task text should match the submitted value");
    //     equal(toDoList[0].completed, false, "Task should be initially marked as incomplete");
    // });
    test("Submitting a new task adds it to the list", () => {
        // Arrange
        const initialTaskCount = toDoList.length;
        const newTaskText = "New Task";

        // Act
        addTask({ text: newTaskText, completed: false });

        // Assert
        equal(toDoList.length, initialTaskCount + 1, "Task count increased");
        equal(toDoList[toDoList.length - 1].text, newTaskText, "Last task is the new task");
    });

    test("Checking an entry marks it as complete", () => {
        // Arrange: Add a task
        const initialTask = { text: "Sample Task", completed: false };
        addTask(initialTask);

        // Act: Complete the task
        completeTask(0);

        // Assert: Check if the task is marked as completed
        const completedTask = toDoList[0];
        equal(completedTask.completed, true, "Task should be marked as completed");
    });

    test("Deleting an entry removes it from the list", () => {
        // Arrange: Add a task
        const initialTask = { text: "Sample Task", completed: false };
        addTask(initialTask);

        // Wait for the DOM to be fully loaded
        window.addEventListener("DOMContentLoaded", () => {
            // Act: Simulate clicking the delete button
            const deleteButton = document.querySelector('.delete-btn');
            deleteButton.click();

            // Assert: Check if the task is removed from the list
            notEqual(toDoList.length, 1, "Task should be removed from the list");
        });
    });

}
// runTests()
