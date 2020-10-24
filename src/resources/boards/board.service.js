const boardsRepo = require('./board.db.repository');
const tasksRepo = require('../tasks/task.db.repository');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const create = board => boardsRepo.create(board);

const deleteById = async id => {
  await tasksRepo.deleteTasksForDeletedBoard(id);
  return boardsRepo.deleteById(id);
};

const update = (id, updatedBoardData) =>
  boardsRepo.update(id, updatedBoardData);

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update
};
