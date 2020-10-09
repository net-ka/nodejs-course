const DB = require('../../common/db');

const getAll = async () => DB.getAllBoards();

const getById = async id => {
  const board = DB.getBoardById(id);

  if (!board) {
    throw new Error(`The board with ${id} was not found`);
  }

  return board;
};

const create = async board => DB.createBoard(board);

const deleteById = async id => {
  const board = DB.deleteBoard(id);

  if (!board) {
    throw new Error(`The board with ${id} was not found`);
  }

  return board;
};

const update = async (id, updatedBoardData) => {
  const updatedBoard = DB.updateBoard(id, updatedBoardData);

  if (!updatedBoard) {
    throw new Error(`The board with ${id} was not found`);
  }

  return updatedBoard;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update
};
