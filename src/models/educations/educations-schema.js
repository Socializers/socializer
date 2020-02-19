/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable */
'use strict';

const mongoose = require('mongoose');

require('./subFolder/subFolder-schema.js');

const educations = mongoose.Schema({

    name: { type: String, required: true },
}, { toObject: { virtuals: true }, toJson: { virtuals: true } });
/**
 * do virtuals for educations with subFolder
 */
educations.virtuals('actual subFolder', {
    ref: 'subFolder',
    localField: 'name',
    foreignField: 'category',
    justOne: false,
});
/**
 * do the join with the other schema then go and findOne
 */

educations.pre('findOne', function () {
    try {
        this.populate('actual subFolder')
    } catch (e) {
        console.error(e)
    }
});

module.exports = mongoose.model('educations', educations);