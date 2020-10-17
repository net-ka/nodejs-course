const DB = require('../../common/database/DBTasks');
const { AppError } = require('../../errorHandlers/appError');

const getAllByBoard = async boardId => {
  const tasks = await DB.getAllTasksByBoard(boardId);

  if (!tasks) {
    throw new AppError(404, 'The tasks were not found');
  }

  return tasks;
};

const getById = async id => {
  const task = await DB.getTaskById(id);

  if (!task) {
    throw new AppError(404, `The task with ${id} was not found`);
  }

  return task;
};

const create = async task => {
  const newTask = await DB.createTaskByBoard(task);

  if (!newTask) {
    throw new AppError(404, 'The task was not created');
  }

  return newTask;
};

const deleteById = async id => {
  const task = await DB.deleteTask(id);

  if (!task) {
    throw new AppError(404, `The task with ${id} was not found`);
  }
};

const update = async (id, updatedTaskData) => {
  const updatedTask = await DB.updateTask(id, updatedTaskData);

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
