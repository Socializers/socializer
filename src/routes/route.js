/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
/* eslint-disable strict*/

'use strict';

const express = require('express');

const router = express.Router();

const modelFinder = require('../middleware/model-finder.js');

/**
 * @param {string}
 * @route model
 * @returns {object}
 */
router.param('model', modelFinder.loadFile);

/**
 * @param {string}
 * @route /api/v1/models
 * @returns {object}
 */

router.get('/api/v1/:model/schema', (req, res, next) => {
  res.status(200).json(req.model.jsonSchema());
});

///// Routes
router.get('/api/v1/test', testHandler);
router.get('/api/v1/:model', getModelHandler);
router.get('/api/v1/:model:_id', getOneModelHandler);
router.post('/api/v1/:model', creatModelHandler);
router.put('/api/v1/:model/:_id', updateModelHandler);
router.delete('/api/v1/:model/:_id', deleteModelHandler);

///// Functions

function testHandler(req,res,next) {
  res.status(200).send('I\'m alive');
}


/**
 * @param {string}
 * @method GET
 * @returns {object}
 */
function getModelHandler(req, res, next) {
  req.model.get()
    .then(data => {
      let count = data.length;
      res.json({ count, data });
    })
    .catch(next);
}

/**
 * @param {string}
 * @method GET
 * @returns {object}
 */
function getOneModelHandler(req, res, next) {
  let _id = req.param.id;
  req.model.get(_id)
    .then(data =>{
      res.json(data);
    })
    .catch(next);
}

/**
 * @param {string}
 * @method POST
 * @returns {object}
 */
function creatModelHandler(req,res,next) {
  let record = req.body;
  req.model.create(record)
    .then(data =>{
      res.json(data);
    })
    .catch(next);
}

/**
 * @param {string}
 * @method GET
 * @returns {object}
 */
function updateModelHandler(req,res,next) {
  let record = req.body;
  let _id = req.param.id;
  req.model.update(_id,record)
    .then(data => {
      res.json(data);
    })
    .catch(next);
}

/**
 * @param {string}
 * @method GET
 * @returns {object}
 */
function deleteModelHandler(req,res,next) {
  let _id = req.param.id;
  req.model.delete(_id)
    .then(()=>{
      let message = `${req.model}`;
      res.send(message);
    })
    .catch(next);
}

module.exports = router;