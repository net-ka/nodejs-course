const DB = require('../../common/database/DBBoards');
const DBTasks = require('../../common/database/DBTasks');
const { AppError } = require('../../errorHandlers/appError');

const getAll = async () => {
  const boards = await DB.getAllBoards();

  if (!boards) {
    throw new AppError(404, 'The boards were not found');
  }

  return boards;
};

const getById = async id => {
  const board = await DB.getBoardById(id);

  if (!board) {
    throw new AppError(404, `The board with ${id} was not found`);
  }

  return board;
};

const create = async board => {
  const newBoard = await DB.createBoard(board);

  if (!newBoard) {
    throw new AppError(404, 'The board was not created');
  }

  return newBoard;
};

const deleteById = async id => {
  const board = await DB.deleteBoard(id);

  if (!board) {
    throw new AppError(404, `The board with ${id} was not found`);
  }

  await DBTasks.deleteTasksForDeletedBoard(id);
};

const update = async (id, updatedBoardData) => {
  const updatedBoard = await DB.updateBoard(id, updatedBoardData);

  if (!updatedBoard) {
    throw new AppError(404, `The board with ${id} was not found`);
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
