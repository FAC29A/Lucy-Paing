# To-Do List Testing Project

<img width="1432" alt="Screenshot 2023-11-15 at 16 41 51" src="https://github.com/FAC29A/Lucy-Paing/assets/121562718/95185bcf-30e5-4727-9b7e-6eecb172ecf4">


Welcome to our To-Do List web app project! This basic To-Do List application incorporates essential features such as adding, deleting, reordering, and filtering tasks. Our primary focus during development was on testing, and we've included a comprehensive testing suite in the index.tests.js file to support Unit Testing practices. 

---

## Project Structure

The project's file structure is organized as follows:

- `index.html`: Contains all elements and is responsible for rendering the interface.
- `style.css`: Manages the styling of the web app.
- `js` folder:
  - `script.js`: The main JavaScript file.
  - `utils` folder: Includes utility modules like `storage.js`, `taskFunctions.js`, and `uiFunctions.js`.
  - `testing` folder: Holds the testing files `index.tests.js` and `test-helpers.js`.

## JavaScript Modules

We've adopted JavaScript modules to maintain code organization without relying on external frameworks. Here's an overview of the modules:

### `storage.js`:

- Manages localStorage, handling data storage and access through functions like `saveTasks` and `loadTasks`.

### `taskFunctions.js`:

- Contains crucial functions for basic app features, such as `addTask` and `deleteTask` for manual task addition and removal, `completeTask` and `clearCompletedTasks` for task completion and clearance, and `reorderTasks` to assist `setUpDragAndDrop` in manual task reordering.

### `uiFunctions.js`:

- Focuses on DOM manipulation and task-related element creation.
- The `displayTasks` function governs the presentation of tasks and their elements, incorporating priority filtering and order.
- `createPriorityDot` generates a color-coded dot in the UI, enhancing the visualization of each task's priority.
- `createTaskElement` generates each task container, invoking other element-creating functions for each individual task body.
- `updatePriority` manages task priority settings.
- `toggleTaskListVisibility` handles task visibility.

---

## Testing

Testing is segmented into two primary files:

### `index.tests.js`:

- Contains a series of tests simulating user actions, including adding, deleting, completing, and clearing completed tasks. All tests are encapsulated in the `runTests` function, executing simultaneously.

### `test-helpers.js`:

- Provides additional test cases for the To-Do List application, aiding in simulating real user interaction in `index.tests.js`.

---

## Collaborators

This project was carried out by [Lucy](https://github.com/lucfercas) & [Paing](https://github.com/Paing-Ko).

<img width="1438" alt="Screenshot 2023-11-15 at 16 40 59" src="https://github.com/FAC29A/Lucy-Paing/assets/121562718/1ec00a13-19ee-4323-bc64-d5d7ffd9c16d">

