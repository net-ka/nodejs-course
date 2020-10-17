const DB = require('../../common/database/DBUsers');
const DBTasks = require('../../common/database/DBTasks');
const { AppError } = require('../../errorHandlers/appError');

const getAll = async () => {
  const users = await DB.getAllUsers();

  if (!users) {
    throw new AppError(404, 'The users were not found');
  }

  return users;
};

const getById = async id => {
  const user = await DB.getUserById(id);

  if (!user) {
    throw new AppError(404, `The user with ${id} was not found`);
  }

  return user;
};

const create = async user => {
  const newUser = await DB.createUser(user);

  if (!newUser) {
    throw new AppError(404, 'The user was not created');
  }

  return newUser;
};

const deleteById = async id => {
  const user = await DB.deleteUser(id);

  if (!user) {
    throw new AppError(404, `The user with ${id} was not found`);
  }

  await DBTasks.changeUserIdToNull(id);
};

const update = async (id, updatedUserData) => {
  const updatedUser = await DB.updateUser(id, updatedUserData);

  if (!updatedUser) {
    throw new AppError(404, `The user with ${id} was not found`);
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
