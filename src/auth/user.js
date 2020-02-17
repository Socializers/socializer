/* eslint-disable no-unused-vars */
/* eslint-disable strict */
'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET ;

const user = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email:{type:String},
});

user.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
  return Promise.reject();
});

user.methods.createFromOauth = function(email){
  if(!email) {return Promise.reject('Validation Error');}
  return this.findOne({email})
    .then(user => {
      if(!user){throw new Error('User Not Found');}
      return user;
    })
    .catch( error => {
      let username = email;
      let password = 'none';
      return this.create({username,password,email});
    });
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
  console.log('token');
  let token = {
    id: user._id,
  };
  return jwt.sign(token, SECRET);
};
user.methods.signupTokenGenerator = function (user) {
  console.log('token');
  let token = {
    id: user._id,
  };
  return jwt.sign(token, SECRET);
};

module.exports = mongoose.model('user', user);