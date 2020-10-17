const DB = require('../../common/database/DBUsers');
const DBTasks = require('../../common/database/DBTasks');
const { AppError } = require('../../errorHandlers/appError');

const getAll = async () => {
  const users = DB.getAllUsers();

  if (!users) {
    throw new AppError(404, 'The users were not found');
  }

  return users;
};

const getById = async id => {
  const user = DB.getUserById(id);

  if (!user) {
    throw new AppError(404, `The user with ${id} was not found`);
  }

  return user;
};

const create = async user => {
  const newUser = DB.createUser(user);

  if (!newUser) {
    throw new AppError(404, 'The user was not created');
  }

  return newUser;
};

const deleteById = async id => {
  await DBTasks.changeUserIdToNull(id);

  const user = DB.deleteUser(id);

  if (!user) {
    throw new AppError(404, `The user with ${id} was not found`);
  }

  // return user;
};

const update = async (id, updatedUserData) => {
  const updatedUser = DB.updateUser(id, updatedUserData);

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
