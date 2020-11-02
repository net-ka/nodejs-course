const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../../common/config');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (authHeader !== undefined) {
    const tokenString = req.header('Authorization');
    const [type, token] = tokenString.split(' ');

    if (type !== 'Bearer') {
      res.status(401).send('Wrong auth schema');
    } else {
      // jwt.verify(token, JWT_SECRET_KEY);
      // return next();
      try {
        jwt.verify(token, JWT_SECRET_KEY);
        return next();
      } catch (e) {
        res.status(401).send('Unauthorized');
      }
    }
  }

  res.status(401).send('Unauthorized');
};
