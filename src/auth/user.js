/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */
'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');



const SECRET = process.env.SECRET;

const user = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
});

user.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
  return Promise.reject();
});

user.statics.createFromOauth = function (email) {
  if (!email) { return Promise.reject('Validation Error'); }

  return this.findOne({ email })
    .then(user => {
      if (!user) { throw new Error('User Not Found'); }
      console.log('Welcome Back', user.username);
      return user;
    })
    .catch(error => {
      console.log('Creating new user');
      let username = email;
      let password = 'none';
      return this.create({ username, password, email });
    });

};

user.statics.decode = function (token) {
  let decoded = jwt_decode(token);
  return decoded;
};

user.statics.authenticator = function (auth) {
  let query = { username: auth.username };
  return this.findOne(query)
    .then(user => {
      return user.passwordComparator(auth.password);
    })
    .catch(console.error);
};

user.methods.passwordComparator = function (pass) {
  return bcrypt.compare(pass, this.password)
    .then(valid => {
      return valid ? this : null;
    })
    .catch(console.error);
};

user.statics.siginTokenGenerator = function (user) {
  let token = {
    id: user._id,
    username: user.username,
    email: user.email,
  };
  return jwt.sign(token, SECRET);
};
user.methods.signupTokenGenerator = function (user) {
  let token = {
    id: user._id,
    username: user.username,
    email: user.email,
  };
  return jwt.sign(token, SECRET);
};

user.statics.authenticateToken = async function (token) {
  try {
    let tokenObject = jwt.verify(token, SECRET);
    if (tokenObject.username) {
      return Promise.resolve(tokenObject.username);
    } else {
      return Promise.reject();
    }
  } catch (e) {
    return Promise.reject();
  }
};

module.exports = mongoose.model('user', user);