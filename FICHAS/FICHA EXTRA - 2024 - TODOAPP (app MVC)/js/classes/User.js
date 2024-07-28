/**
 * @class User
 * @description Represents a user
 * @param {string} email
 * @param {string} username
 * @param {string} password
 * @param {number} points
 * @returns {User}
 */

export default class User {
  email = "";
  username = "";
  password = "";
  points = 0;

  /**
   * @constructor User
   * @description Creates a new User object
   * @param {string} email
   * @param {string} username
   * @param {string} password
   * @param {number} points
   *
   * @returns {User}
   *
   */

  constructor(email, username, password, points = 0) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.points = points;
  }
}
