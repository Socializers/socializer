/* eslint-disable */
'use strict';

const mongoose = require('mongoose');
const developers = mongoose.Schema({
  name: { type: String, required: true },
  des: { type: String, required: true },
}, { strict:false })

module.exports = mongoose.model('developers', developers)
