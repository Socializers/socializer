/* eslint-disable strict */
'use strict';

const fs = require('fs');
const util = require('util');
const reddir = util.promisify(fs.readdir);

const modelsFolder = `${__dirname}/../models`;

/**
 * @param {requsetedObjct}
 * @returns {object}
 */

const loadFile = (req, res, next) => {
  let modelName = req.params.model.replace(/[^a-z0-9-_]/gi, '');
  const Model = require(`../models/${modelName}/${modelName}-model.js`);
  console.log('Model%%',Model);
  
  req.model = new Model();
  console.log('req.model',req.model)
  next();
};

/**
 * @returns {object}
 */

const list = () => {
  return reddir(modelsFolder)
    .then(contents => {
      contents.filter(entry => {
        return fs.lstatSync(`${modelsFolder}/${entry}`).isDirectory() && fs.statSync(`${modelsFolder}/${entry}/${entry}-model.js`);
      });
    })
    .catch(console.error);
};

module.exports = { loadFile, list };