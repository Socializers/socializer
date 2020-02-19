/* eslint-disable */
'use strict';

const mongoose = require('mongoose');
const science = mongoose.Schema({
    name: { type: String, required: true },
    des: { type: String, required: true },
}, { strict:false })

module.exports = mongoose.model('science', science)
