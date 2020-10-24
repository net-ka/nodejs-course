const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../config');

const connectToDB = fn => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'Сonnection error:'));

  db.once('open', () => {
    console.log('Database was connected!');
    fn();
  });
};

module.exports = connectToDB;
