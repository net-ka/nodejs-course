const User = require('../users//user.model');
const { AppError } = require('../../errorHandlers/appError');

const getUserWithLogin = async login => {
  const user = await User.findOne({ login });

  if (!user) {
    throw new AppError(401, "Forbidden, you don't have permission to access");
  }

  return user;
};

module.exports = {
  getUserWithLogin
};
