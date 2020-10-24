const usersRepo = require('./user.db.repository');
const tasksRepo = require('../tasks/task.db.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = user => usersRepo.create(user);

const deleteById = async id => {
  await tasksRepo.changeUserIdToNull(id);
  return usersRepo.deleteById(id);
};

const update = (id, updatedUserData) => usersRepo.update(id, updatedUserData);

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update
};
