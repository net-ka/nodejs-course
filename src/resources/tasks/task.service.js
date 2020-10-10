const tasksRepo = require('./task.memory.repository');

const getAllByBoard = boardId => tasksRepo.getAllByBoard(boardId);

const getById = id => tasksRepo.getById(id);

const create = task => tasksRepo.create(task);

const deleteById = id => tasksRepo.deleteById(id);

const update = (id, updatedTaskData) => tasksRepo.update(id, updatedTaskData);

module.exports = {
  getAllByBoard,
  getById,
  create,
  deleteById,
  update
};
