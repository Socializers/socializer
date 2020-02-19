/* eskint-disable strict */

// eslint-disable-next-line strict
'use strict';

const schema = require('./anime-schema.js');
const Model = require('../mongo.js');

class Anime extends Model{
  constructor(){
    super(schema);
  }
}

module.exports = Anime;