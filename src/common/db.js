const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const DBUsers = [];
const DBBoards = [];

(() => {
  for (let i = 0; i < 3; i++) {
    DBUsers.push(new User());
  }
})();

(() => {
  for (let i = 0; i < 2; i++) {
    DBBoards.push(new Board());
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
  DBUsers.splice(index, 1);

  return DBUsers;
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
  DBBoards.splice(index, 1);

  return DBBoards;
};

const updateBoard = async (id, updatedBoardData) => {
  const index = DBBoards.findIndex(board => board.id === id);

  const updatedBoard = {
    id: DBBoards[index].id,
    title: updatedBoardData.title,
    columns: updatedBoardData.columns
  };

  DBBoards[index] = updatedBoard;

  return getBoardById(id);
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
  deleteBoard
};
