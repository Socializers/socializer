/* eslint-disable no-undef */
'use strict';
const schema = require('./educations-schema.js');
const Model = require('../mongo.js');
class Educations extends Model{
  constructor(){
    super(schema);
  }
}
module.exports = new Educations;