const User = require('./user.model');
const { AppError } = require('../../errorHandlers/appError');

const getAll = async () => {
  const users = await User.find({});

  if (!users) {
    throw new AppError(404, 'The users were not found');
  }

  return users;
};

const getById = async id => {
  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new AppError(404, `The user with ${id} was not found`);
  }

  return user;
};

const create = async user => {
  const newUser = await User.create(user);

  if (!newUser) {
    throw new AppError(400, 'The user was not created');
  }

  return newUser;
};

const deleteById = async id => {
  const isDeleted = (await User.deleteOne({ _id: id })).ok;

  if (!isDeleted) {
    throw new AppError(404, `The user with ${id} was not found`);
  }
};

const update = async (id, updatedUserData) => {
  const updatedUser = await User.updateOne({ _id: id }, updatedUserData);

  if (!updatedUser) {
    throw new AppError(400, `The user with ${id} was not updated`);
  }

  return updatedUser;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update
};
