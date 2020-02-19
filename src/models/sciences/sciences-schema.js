/* eslint-disable */
'use strict';

const mongoose = require('mongoose');
const sciences = mongoose.Schema({
    name: { type: String, required: true },
    des: { type: String, required: true },
}, { strict:false })

module.exports = mongoose.model('sciences', sciences)
