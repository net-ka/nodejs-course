const DB = require('../../common/db');

const getAllByBoard = async boardId => DB.getAllTasksByBoard(boardId);

const getById = async id => {
  const task = DB.getTaskById(id);

  if (!task) {
    throw new Error(`The task with ${id} was not found`);
  }

  return task;
};

const create = async task => DB.createTaskByBoard(task);

const deleteById = async id => {
  const task = DB.deleteTask(id);

  if (!task) {
    throw new Error(`The task with ${id} was not found`);
  }

  return task;
};

const update = async (id, updatedTaskData) => {
  const updatedTask = DB.updateTask(id, updatedTaskData);

  if (!updatedTask) {
    throw new Error(`The task with ${id} was not found`);
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
