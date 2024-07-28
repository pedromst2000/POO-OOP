/**
 * @class Task
 * @description Task class to create new Task objects
 * @param {string} name
 * @param {string} status
 * @param {number} taskPoints
 * @param {number} creatorId
 * @param {boolean} canGetPoints
 * @returns {Task}
 */

export default class Task {
  name = "";
  status = "";
  taskPoints = 0;
  creatorId = 0;
  canGetPoints = false;

  /**
   * @constructor Task
   * @description Creates a new Task object
   * @param {string} name
   * @param {string} status
   * @param {number} taskPoints
   * @param {number} creatorId
   * @param {boolean} canGetPoints
   * @returns {Task}
   *
   */

  constructor(name, status, taskPoints, creatorId, canGetPoints) {
    this.name = name;
    this.status = status;
    this.taskPoints = taskPoints;
    this.creatorId = creatorId;
    this.canGetPoints = canGetPoints;
  }
}
