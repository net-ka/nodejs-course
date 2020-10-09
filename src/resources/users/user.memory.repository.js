const DB = require('../../common/db');

const getAll = async () => DB.getAllUsers();

const getById = async id => {
  const user = await DB.getUserById(id);

  if (!user) {
    throw new Error(`The user with ${id} was not found`);
  }

  return user;
};

const create = async user => DB.createUser(user);

const deleteById = async id => {
  const user = await DB.deleteUser(id);

  if (!user) {
    throw new Error(`The user with ${id} was not found`);
  }

  return user;
};

const update = async (id, updatedUserData) => {
  const updatedUser = await DB.updateUser(id, updatedUserData);

  if (!updatedUser) {
    throw new Error(`The user with ${id} was not found`);
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
