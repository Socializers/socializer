/* eslint-disable new-cap */
/* eslint-disable strict */

'use strict';

const mongoose = require('mongoose');

const math = mongoose.Schema({
  name: { type: String, required: true },
  des: { type: String, required: true },
}, { strict:false });

module.exports = mongoose.model('math', math);