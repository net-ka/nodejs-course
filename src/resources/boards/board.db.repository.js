const Board = require('./board.model');
const { AppError } = require('../../errorHandlers/appError');

const getAll = async () => {
  const boards = await Board.find({});

  if (!boards) {
    throw new AppError(404, 'The boards were not found');
  }

  return boards;
};

const getById = async id => {
  const board = await Board.findOne({ _id: id });

  if (!board) {
    throw new AppError(404, `The board with ${id} was not found`);
  }

  return board;
};

const create = async board => {
  const newBoard = await Board.create(board);

  if (!newBoard) {
    throw new AppError(400, 'The board was not created');
  }

  return newBoard;
};

const deleteById = async id => {
  const isDeleted = (await Board.deleteOne({ _id: id })).ok;

  if (!isDeleted) {
    throw new AppError(404, `The board with ${id} was not found`);
  }
};

const update = async (id, updatedBoardData) => {
  const updatedBoard = await Board.updateOne({ _id: id }, updatedBoardData);

  if (!updatedBoard) {
    throw new AppError(400, `The board with ${id} was not updated`);
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
