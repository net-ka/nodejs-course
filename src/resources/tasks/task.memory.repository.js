const DB = require('../../common/database/DBTasks');
const { AppError } = require('../../errorHandlers/appError');

const getAllByBoard = async boardId => {
  const tasks = DB.getAllTasksByBoard(boardId);

  if (!tasks) {
    throw new AppError(404, 'The tasks were not found');
  }

  return tasks;
};

const getById = async id => {
  const task = DB.getTaskById(id);

  if (!task) {
    throw new AppError(404, `The task with ${id} was not found`);
  }

  return task;
};

const create = async task => {
  const newTask = DB.createTaskByBoard(task);

  if (!newTask) {
    throw new AppError(404, 'The task was not created');
  }

  return newTask;
};

const deleteById = async id => {
  const task = DB.deleteTask(id);

  if (!task) {
    throw new AppError(404, `The task with ${id} was not found`);
  }

  // return task;
};

const update = async (id, updatedTaskData) => {
  const updatedTask = DB.updateTask(id, updatedTaskData);

  if (!updatedTask) {
    throw new AppError(404, `The task with ${id} was not found`);
  }

  return updatedTask;
};

module.exports = {
  getAllByBoard,
  getById,
  create,
  deleteById,
  update
};
