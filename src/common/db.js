const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const DBUsers = [];
const DBBoards = [];
const DBTasks = [];

(() => {
  for (let i = 0; i < 3; i++) {
    DBUsers.push(new User());
    DBBoards.push(new Board());
    DBTasks.push(new Task());
  }
})();

// users

const getAllUsers = async () => {
  return DBUsers;
};

const getUserById = async id => {
  return DBUsers.find(user => user.id === id);
};

const createUser = async user => {
  DBUsers.push(user);
  return getUserById(user.id);
};

const deleteUser = async id => {
  const index = DBUsers.findIndex(user => user.id === id);

  if (index >= 0) {
    const deletedUser = DBUsers.splice(index, 1);

    DBTasks.forEach(task => {
      if (task.userId === id) {
        task.userId = null;
      }
    });

    return deletedUser;
  }

  return null;
};

const updateUser = async (id, updatedUserData) => {
  const index = DBUsers.findIndex(user => user.id === id);
  DBUsers[index] = { id, ...updatedUserData };

  return getUserById(id);
};

// boards

const getAllBoards = async () => {
  return DBBoards;
};

const getBoardById = async id => {
  return DBBoards.find(board => board.id === id);
};

const createBoard = async board => {
  DBBoards.push(board);
  return getBoardById(board.id);
};

const deleteBoard = async id => {
  const index = DBBoards.findIndex(board => board.id === id);

  if (index >= 0) {
    const deletedBoard = DBBoards.splice(index, 1);

    const tasksForDelete = DBTasks.map(task => {
      if (task.boardId === id) {
        return task.id;
      }
    });

    tasksForDelete.forEach(taskId => {
      deleteTask(taskId);
    });

    return deletedBoard;
  }

  return null;
};

const updateBoard = async (id, updatedBoardData) => {
  const index = DBBoards.findIndex(board => board.id === id);

  const updatedBoard = { id, ...updatedBoardData };

  DBBoards[index] = updatedBoard;

  return getBoardById(id);
};

// tasks

const getAllTasksByBoard = async boardId => {
  return DBTasks.filter(task => task.boardId === boardId);
};

const getTaskById = async id => {
  return DBTasks.find(task => task.id === id);
};

const createTaskByBoard = async task => {
  DBTasks.push(task);

  return getTaskById(task.id);
};

const deleteTask = async id => {
  const index = DBTasks.findIndex(task => task.id === id);

  if (index >= 0) {
    const deletedTask = DBTasks.splice(index, 1);

    return deletedTask;
  }

  return null;
};

const updateTask = async (id, updatedTaskData) => {
  const index = DBTasks.findIndex(task => task.id === id);

  const updatedTask = { id, ...updatedTaskData };

  DBTasks[index] = updatedTask;

  return getTaskById(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,

  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,

  getAllTasksByBoard,
  getTaskById,
  createTaskByBoard,
  deleteTask,
  updateTask
};
