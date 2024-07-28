import Task from "../classes/Task.js";

export let tasks;

/**
 * @function init
 * @description This function initializes the local storage with data.
 * @returns {void}
 */

export function init() {
  tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.tasks) : [];
}

/**
 * @function add
 * @description This function adds a new task to the tasks array.
 * @param {string} name
 * @param {string} status
 * @param {number} taskPoints
 * @returns {void}
 */

export function add(name, status, taskPoints, creatorId) {
  // checking if the task name already exists
  if (tasks.find((t) => t.name === name)) {
    throw new Error(`The task already exists.`);
  } else {
    const task = new Task(name, status, taskPoints, creatorId, true);

    tasks.push({ id: tasks.length + 1, ...task });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

/**
 * @function remove
 * @description This function removes a task from the tasks array.
 * @param {number} id
 * @returns {void}
 */

export function remove(id) {
  const index = tasks.findIndex((t) => t.id === id);

  tasks.splice(index, 1);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * @function filterTasks
 * @description This function filters the tasks by status.
 * @param {string} status
 * @param {number} creator
 * @returns {Task[]} tasks
 */

export function filterTasks(status, creator) {
  return tasks
    .filter((task) => task.status === status && task.creatorId === creator)
    .sort((a, b) => b.taskPoints - a.taskPoints);
}

/**
 * @function updateTask
 * @description This function updates the task status.
 * @param {Task} task
 * @returns {void}
 */

export function updateTask(task) {
  const index = tasks.findIndex((t) => t.id === task.id);

  tasks[index].status = task.status;

  tasks[index].canGetPoints = task.canGetPoints;

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * @function getTaskByID
 * @description This function returns the task id by name.
 * @param {number} id
 * @returns {number} id
 */

export function getTaskByID(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    throw new Error(`The task does not exist.`);
  }
  return task;
}

/**
 * @function getTaskByName
 * @description This function returns the task by name.
 * @param {string} name
 * @returns {Task} task
 */

export function getTaskByName(name) {
  const task = tasks.find((t) => t.name === name);
  if (!task) {
    throw new Error(`The task does not exist.`);
  }
  return task;
}
