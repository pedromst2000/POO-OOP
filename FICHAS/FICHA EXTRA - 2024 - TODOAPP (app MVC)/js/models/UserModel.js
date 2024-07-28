import User from "../classes/User.js";

let users;

/**
 * @function init
 * @description This function initializes the local storage with data.
 * @returns {void}
 */

export function init() {
  users = localStorage.getItem("users") ? JSON.parse(localStorage.users) : [];
}

/**
 * @function add
 * @description This function adds a new user to the users array.
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {void}
 */

export function add(email, username, password) {
  // checking if the email already exists
  if (users.some((u) => u.email === email)) {
    throw new Error(`The email already exists.`);
  }

  // checking if the username already exists
  if (users.some((u) => u.username === username)) {
    throw new Error(`The username already exists.`);
  } else {
    const user = new User(email, username, password);

    users.push({ id: users.length + 1, ...user });

    localStorage.setItem("users", JSON.stringify(users));
  }
}

/**
 * @function login
 * @description This function allows the user to login.
 * @param {string} username
 * @param {string} password
 * @returns {boolean}
 */

export function login(username, password) {
  const user = users.find((u) => u.username === username);

  if (!user) {
    throw new Error(`The username ${username} does not exist.`);
  }

  if (user.password !== password) {
    throw new Error("The password is incorrect.");
  }

  sessionStorage.setItem("loggedUser", JSON.stringify(user));

  return true;
}

/**
 * @function logout
 * @description This function allows the user to logout.
 * @returns {void}
 */

export function logout() {
  sessionStorage.removeItem("loggedUser");
}

/**
 * @function getLoggedUser
 * @description This function returns the logged user.
 * @returns {User}
 */

export function getLoggedUser() {
  return JSON.parse(sessionStorage.loggedUser);
}

/**
 * @function isLogged
 * @description This function checks if the user is logged.
 * @returns {boolean}
 * @returns {void}
 */

export function isLogged() {
  return !!sessionStorage.loggedUser; // !! converts the value to a boolean true or false
}

/**
 * @function updateLoggedUserPoints
 * @description This function updates the user points.
 * @param {User} user
 * @param {number} newPoints
 * @returns {void}
 */

export function updateLoggedUserPoints(user, newPoints) {
  
  const index = users.findIndex((u) => u.id === user.id);

  users[index].points = newPoints < 0 ? 0 : newPoints;


  localStorage.setItem("users", JSON.stringify(users));
  sessionStorage.setItem("loggedUser", JSON.stringify(users[index]));
}