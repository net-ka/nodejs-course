const Task = require('./task.model');
const { AppError } = require('../../errorHandlers/appError');

const getAllByBoard = async boardId => {
  const tasks = await Task.find({ boardId });

  if (!tasks) {
    throw new AppError(404, 'The tasks were not found');
  }

  return tasks;
};

const getById = async id => {
  const task = await Task.findOne({ _id: id });

  if (!task) {
    throw new AppError(404, `The task with ${id} was not found`);
  }

  return task;
};

const create = async task => {
  const newTask = await Task.create(task);

  if (!newTask) {
    throw new AppError(400, 'The task was not created');
  }

  return newTask;
};

const deleteById = async id => {
  const isDeleted = (await Task.deleteOne({ _id: id })).ok;

  if (!isDeleted) {
    throw new AppError(404, `The task with ${id} was not found`);
  }
};

const update = async (id, updatedTaskData) => {
  const updatedTask = await Task.updateOne({ _id: id }, updatedTaskData);

  if (!updatedTask) {
    throw new AppError(400, `The task with ${id} was not updated`);
  }

  return updatedTask;
};

const changeUserIdToNull = async userId => {
  const isUpdatedTask = await Task.updateMany({ userId }, { userId: null });

  if (!isUpdatedTask) {
    throw new AppError(
      404,
      `The users for the task with ${userId} were not unassigned`
    );
  }
};

const deleteTasksForDeletedBoard = async boardId => {
  const isDeleted = (await Task.deleteMany({ boardId })).ok;

  if (!isDeleted) {
    throw new AppError(
      404,
      `The tasks for board with id ${boardId} were not unassigned`
    );
  }
};

module.exports = {
  getAllByBoard,
  getById,
  create,
  deleteById,
  update,
  changeUserIdToNull,
  deleteTasksForDeletedBoard
};
