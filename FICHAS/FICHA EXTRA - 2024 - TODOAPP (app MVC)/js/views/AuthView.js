import * as User from "../models/UserModel.js";
import { validateEmail, displayMessage } from "../utils.js";

/**
 * @function authView
 * @description This function renders the authentication view.
 * @returns {void}
 */

function authView() {
  User.init();

  let email;
  let username;
  let password;

  location.pathname.includes("login")
    ? (document.getElementById("login-form").onsubmit = (e) => {
        e.preventDefault();

        username = document.getElementById("username").value;
        password = document.getElementById("password").value;

        try {
          if (!username || !password) {
            throw new Error("Please fill in all the fields.");
          }

          User.login(username, password);
          displayMessage(
            "#message",
            "You have successfully logged in.",
            "success"
          );
          setTimeout(() => {
            location.reload();
          }, 5500);

          setTimeout(() => {
            location.href = "/index.html";
          }, 1500);
        } catch (e) {
          displayMessage("#message", e.message, "error");
        }
      })
    : (document.getElementById("register-form").onsubmit = (e) => {
        e.preventDefault();

        email = document.getElementById("email").value;
        username = document.getElementById("username").value;
        password = document.getElementById("password").value;

        try {
          if (!email || !username || !password) {
            throw new Error("Please fill in all the fields.");
          }

          if (!validateEmail(email)) {
            throw new Error("Please enter a valid email.");
          }

          User.add(email, username, password);
          displayMessage(
            "#message",
            "You have successfully registered.",
            "success"
          );
          setTimeout(() => {
            location.href = "/html/auth/login.html";
          }, 2500);
        } catch (e) {
          displayMessage("#message", e.message, "error");
        }
      });
}

authView();
