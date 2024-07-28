import * as User from "./models/UserModel.js";
import * as Task from "./models/TaskModel.js";

/**
 * @function displayMessage
 * @description This function displays a message on the screen.
 * @param {string} element
 * @param {string} message
 * @param {string} type
 * @returns {void}
 */

export function displayMessage(element, message, type) {
  const divMessage = document.querySelector(element);
  divMessage.innerHTML = `
    <div class="auth-message-${type}">${message}</div>
`;

  setTimeout(() => {
    divMessage.innerHTML = "";
  }, 2000);
}

/**
 * @function validateEmail
 * @description This function validates an email.
 * @param {string} email
 * @returns {boolean}
 */

export function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

/**
 * @function safeGuardeRoutes
 * @description This function safe guardes the routes.
 * @param {object} User
 * @returns {void}
 */

export function safeGuardeRoutes(User) {
  if (
    !User.isLogged() &&
    (location.pathname === "/index.html" ||
      location.pathname === "/html/task.html")
  ) {
    location.href = "/html/auth/login.html";
  } else if (
    (User.isLogged() && location.pathname === "/html/auth/login.html") ||
    location.pathname === "/html/auth/register.html"
  ) {
    location.href = "/index.html";
  }
}

/**
 * @function renderList
 * @description This function renders the list of tasks.
 * @param {string} list
 * @param {string} status
 * @param {string} divID
 * @param {boolean} isReRendering = false (if is false it will append the list otherwise it will replace the list for re-rendering)
 * @returns {void}
 */

export function renderList(list, status, divID, isRerendering = false) {
  return isRerendering
    ? (document.getElementById(list).innerHTML = `
   ${Task.filterTasks(status, User.getLoggedUser().id)
     .map((task) => {
       return `
      <div id="${divID}" class="draggable ${task.id}"
      draggable="true"
      >
      <div id="task-title">
    ${task.name}
    </div>
      <div id="task-points">
    ${task.taskPoints}
    </div>
    </div>
    `;
     })
     .join("")}
  `)
    : (document.getElementById(list).innerHTML += `
   ${Task.filterTasks(status, User.getLoggedUser().id)
     .map((task) => {
       return `
       <div id="${divID}" class="draggable ${task.id}"
       draggable="true"
       >
       <div id="task-title">
     ${task.name}
     </div>
       <div id="task-points">
     ${task.taskPoints}
     </div>
     </div>
     `;
     })
     .join("")}
   `);
}

/**
 * @function getDragAfterElement
 * @description This function gets the element after the dragged element.
 * @param {HTMLElement} column
 * @param {number} posY
 * @returns {HTMLElement}
 */

export function getDragAfterElement(column, posY) {
  const cards = [...column.querySelectorAll(".draggable:not(.dragging)")];

  return cards.reduce(
    (closest, card) => {
      const cardRect = card.getBoundingClientRect();
      const offset = posY - cardRect.top - cardRect.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: card };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

/**
 * @function managePoints
 * @description This function manages the points of the user.
 * @param {object} task
 * @returns {void}
 */

export function managePoints(task) {
  // // adding the task points to the user
  if (task.status === "Done" && task.canGetPoints == true) {
    Task.updateTask({ ...task, canGetPoints: false });

    User.updateLoggedUserPoints(
      User.getLoggedUser(),
      User.getLoggedUser().points + task.taskPoints
    );

    // sound effect when task is completed
    const audio = new Audio("../assets/sounds/task-completed.mp3");
    audio.play();
    viewPoints();
  } else if (task.status === "Done" && task.canGetPoints == false) {
    User.updateLoggedUserPoints(
      User.getLoggedUser(),
      User.getLoggedUser().points
    );

    viewPoints();
  }

  // // // removing the task points from the user
  if (task.status !== "Done" && !task.canGetPoints) {
    Task.updateTask({ ...task, canGetPoints: true });
    User.updateLoggedUserPoints(
      User.getLoggedUser(),
      User.getLoggedUser().points - task.taskPoints
    );

    viewPoints();
  }
}

/**
 * @function viewPoints
 * @description This function displays the points of the user.
 * @returns {void}
 */

export function viewPoints() {
  document.getElementById("score").innerHTML = `SCORE: ${
    User.getLoggedUser().points
  }`;
}
