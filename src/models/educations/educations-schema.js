/* eslint-disable */
'use strict';

const mongoose = require('mongoose');

const educations = mongoose.Schema({
  name: { type: String, required: true },
}, { strict:false });



module.exports = mongoose.model('educations', educations)
