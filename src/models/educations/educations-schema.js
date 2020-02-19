/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable */
'use strict';

const mongoose = require('mongoose');

const educations = mongoose.Schema({

  name: { type: String, required: true },
}, { strict:false });

module.exports = mongoose.model('educations', educations)
