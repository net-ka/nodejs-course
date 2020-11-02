const uuid = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  name: String,
  login: String,
  password: String
});

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

userSchema.pre('save', function preSave(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (errSalt, salt) => {
    if (errSalt) return next(errSalt);

    bcrypt.hash(user.password, salt, (errHash, hash) => {
      if (errHash) return next(errHash);
      user.password = hash;
      next();
    });
  });
});

userSchema.pre('updateOne', async function preUpdate(next) {
  const data = this.getUpdate();

  data.password = await bcrypt.hash(data.password, 10);
  this.update({}, data).exec();
  next();
});

userSchema.statics.checkHashPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
