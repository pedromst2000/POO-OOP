initData();

/**
 * @function initData
 * @description This function initializes the local storage with data.
 * @returns {void}
 */

function initData() {
  // TASKS
  if (!localStorage.tasks) {
    /**
     * @constant tasks
     * @description This constant stores the tasks.
     * @property {number} id
     * @property {string} name
     * @property {string} status
     * @property {number} taskPoints
     * @property {number} creatorId
     * @property {boolean} canGetPoints (to prevent the user from getting points more than once for already done tasks)
     */

    const tasks = [
      {
        id: 1,
        name: "Do Dishes",
        status: "To Do",
        taskPoints: 350,
        creatorId: 2,
        canGetPoints: true,
      },
      {
        id: 2,
        name: "Working on the project",
        status: "Doing",
        taskPoints: 780,
        creatorId: 1,
        canGetPoints: true,
      },
      {
        id: 3,
        name: "Play Guitar",
        status: "Done",
        taskPoints: 230,
        creatorId: 1,
        canGetPoints: false,
      },
      {
        id: 4,
        name: "Study for the exam",
        status: "To Do",
        taskPoints: 510,
        creatorId: 2,
        canGetPoints: true,
      },
      {
        id: 5,
        name: "Prepare the presentation",
        status: "To Do",
        taskPoints: 120,
        creatorId: 1,
        canGetPoints: true,
      },
      {
        id: 6,
        name: "Practice Yoga",
        status: "Done",
        taskPoints: 430,
        creatorId: 2,
        canGetPoints: false,
      },
      {
        id: 7,
        name: "working on the lab",
        status: "Doing",
        taskPoints: 330,
        creatorId: 2,
        canGetPoints: true,
      },
    ];

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // USERS
  if (!localStorage.users) {
    const users = [
      {
        id: 1,
        email: "pedromst@hotmail.com",
        username: "pedromst",
        password: "123456",
        points: 230,
      },
      {
        id: 2,
        email: "rita@hotmail.com",
        username: "rita",
        password: "123456",
        points: 430,
      },
    ];

    localStorage.setItem("users", JSON.stringify(users));
  }
}
