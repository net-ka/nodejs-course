const Board = require('../../resources/boards/board.model');

const DBBoards = [];

(() => {
  for (let i = 0; i < 3; i++) {
    DBBoards.push(new Board());
  }
})();

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

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
