const authRepo = require('./auth.db.repository');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const User = require('../users/user.model');

const loginToken = async loginData => {
  const user = await authRepo.getUserWithLogin(loginData.login);

  if (user) {
    const isPasswordCorrect = await User.checkHashPassword(
      loginData.password,
      user.password
    );

    if (isPasswordCorrect) {
      const { _id, login } = user;
      const token = jwt.sign({ userId: _id, login }, JWT_SECRET_KEY, {
        expiresIn: 3500
      });

      return token;
    }

    return null;
  }
};

module.exports = {
  loginToken
};
