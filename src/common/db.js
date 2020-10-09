const User = require('../resources/users/user.model');

const DB = {
  Users: [],

  async getAllUsers() {
    return [...this.Users];
  },

  async getUserById(id) {
    return this.Users.filter(user => user.id === id)[0];
  },

  async createUser(user) {
    this.Users.push(user);
    return this.getUserById(user.id);
  },

  async deleteUser(id) {
    this.Users = this.Users.filter(user => user.id !== id);
    return this.Users;
  },

  async updateUser(id, updatedUserData) {
    const index = this.Users.findIndex(user => user.id === id);
    this.Users[index] = { id, ...updatedUserData };

    return this.getUserById(id);
  }
};

(() => {
  for (let i = 0; i < 3; i++) {
    DB.Users.push(new User());
  }
})();

module.exports = DB;
