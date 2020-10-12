const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const create = board => boardsRepo.create(board);

const deleteById = id => boardsRepo.deleteById(id);

const update = (id, updatedBoardData) =>
  boardsRepo.update(id, updatedBoardData);

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update
};
