import * as User from "../models/UserModel.js";
import * as Task from "../models/TaskModel.js";
import {
  safeGuardeRoutes,
  renderList,
  getDragAfterElement,
  managePoints,
  viewPoints,
} from "../utils.js";

/**
 * @function homeView
 * @description This function renders the home view.
 * @returns {void}
 */

function homeView() {
  User.init();
  Task.init();

  safeGuardeRoutes(User);

  renderList("todo-list", "To Do", "todo-item-container");
  renderList("doing-list", "Doing", "doing-item-container");
  renderList("done-list", "Done", "done-item-container");

  document.getElementById("Logout").onclick = () => {
    User.logout();
    location.href = "/html/auth/login.html";
  };

  document.getElementById("addTask").onclick = () => {
    let name;
    let taskPoints;

    try {
      name = prompt("Enter the task name:");

      while (name !== null && name === "") {
        alert("The task name is required.");
        name = prompt("Enter the task name:");
      }

      if (name !== null) {
        taskPoints = +prompt("Enter the task points:");

        while (taskPoints === 0) {
          alert("The task points are required.");
          taskPoints = +prompt("Enter the task points:");
        }

        while (isNaN(taskPoints)) {
          alert("The task points must be a number.");
          taskPoints = +prompt("Enter the task points:");
        }

        Task.add(name, "To Do", taskPoints, User.getLoggedUser().id);
        alert("Task added successfully.");
        renderList("todo-list", "To Do", "todo-item-container", true);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  document.getElementById("deleteTask").onclick = () => {
    let name;

    try {
      name = prompt("Enter the task name to delete:");

      while (name !== null && name === "") {
        alert("The task name is required.");
        name = prompt("Enter the task name:");
      }

      if (name !== null) {
        const task = Task.getTaskByName(name);

        if (task) {
          Task.remove(task.id);
          alert("Task deleted successfully.");

          const audio = new Audio("../assets/sounds/task-completed.mp3");
          audio.play();

          const user = User.getLoggedUser();

          if (task.status === "Done") {
            User.updateLoggedUserPoints(user, user.points - task.taskPoints);
          }

          viewPoints();
          renderList("todo-list", "To Do", "todo-item-container", true);
          renderList("doing-list", "Doing", "doing-item-container", true);
          renderList("done-list", "Done", "done-item-container", true);
        } else {
          alert("The task does not exist.");
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  viewPoints();

  const columns = document.querySelectorAll(".kanban-column");
  const todoList = document.getElementById("todo-list");
  const doingList = document.getElementById("doing-list");
  const doneList = document.getElementById("done-list");

  document.body.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("draggable")) {
      e.target.classList.add("dragging");
    }
  });

  document.body.addEventListener("dragend", (e) => {
    if (e.target.classList.contains("draggable")) {
      e.target.classList.remove("dragging");
    }
  });

  columns.forEach((item) => {
    item.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(item, e.clientY);
      const draggable = document.querySelector(".dragging");
      if (afterElement == null) {
        item.appendChild(draggable);
      } else {
        item.insertBefore(draggable, afterElement);
      }
    });
  });

  // -------------------------------Drag Drop - ToDO -------------------------------------------------------------

  todoList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    draggable.style.background = "rgba(163, 45, 15, 0.685)";
  });

  todoList.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");

    // getting the id of the classname
    const taskId = draggable.className.split(" ")[1];
    const task = Task.getTaskByID(+taskId);
    Task.updateTask({ ...task, status: "To Do" });

    managePoints(task);
  });

  //  ------------------------------- Drag Drop - Doing -------------------------------------------------------------

  doingList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    draggable.style.background = "rgba(46, 112, 146, 0.685)";
  });

  doingList.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    const taskId = draggable.className.split(" ")[1];
    const task = Task.getTaskByID(+taskId);
    Task.updateTask({ ...task, status: "Doing" });

    managePoints(task);
  });

  //  -------------------------------Drag  Drop - Done -------------------------------------------------------------

  doneList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    draggable.style.background = "rgba(39, 113, 16, 0.518)";
  });

  doneList.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    const taskId = draggable.className.split(" ")[1];
    const task = Task.getTaskByID(+taskId);
    Task.updateTask({ ...task, status: "Done" });

    managePoints(task);
  });
}

homeView();
