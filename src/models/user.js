const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const uuid = require('node-uuid');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  secrets: [{
    title: String,
    secret: { type: String, unique: true },
  }],

  pushes: [{
    title: String,
    content: String,
    secret: String,
  }],

  devices: [{
    registration_id: { type: String, unique: true }
  }]

}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for creating new secret.
 */
userSchema.methods.createSecret = function createSecret(name, cb) {
  const secret = {
    name,
    secret: uuid.v4(),
  }
  this.secrets.push(secret);
  cb();
}

const User = mongoose.model('User', userSchema);

module.exports = User;
