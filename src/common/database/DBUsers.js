const User = require('../../resources/users/user.model');
const DBTasks = require('./DBTasks');

const DBUsers = [];

(() => {
  for (let i = 0; i < 3; i++) {
    DBUsers.push(new User());
  }
})();

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

  if (index >= 0) {
    const deletedUser = DBUsers.splice(index, 1);

    await DBTasks.changeUserIdToNull(id);

    return deletedUser;
  }

  return null;
};

const updateUser = async (id, updatedUserData) => {
  const index = DBUsers.findIndex(user => user.id === id);
  DBUsers[index] = { id, ...updatedUserData };

  return getUserById(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser
};
