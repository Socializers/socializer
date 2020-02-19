
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable strict */
'use strict';

const { server, } = require('../server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('Schemas API', () => {
    // videogames schema for test 
  it('post a new videogame', () => {
    let obj = { name: 'the boy in the mirror ', des: 'slice of life ' };
    return mockRequest.post('/api/v1/videogames')
      .send(obj)
      .then(data => {
        let record = data.body;
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });

  it('get videogames items', () => {
    return mockRequest
      .get('/api/v1/videogames')
      .then(data => {
        expect(data.status).toBe(200);
        expect(typeof data.body).toMatch('object');
      });
  });

  it('get one videogames item', () => {
    let obj = { name: 'the boy in the mirror ', des: 'slice of life ' };
    return mockRequest.post('/api/v1/videogames')
      .send(obj)
      .then(data => {
          return mockRequest.get(`/api/v1/videogames/${data.body._id}`)
          .then(data => {
            let record = data.body;
            Object.keys(obj).forEach(key => {
              expect(record[key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('update videogames', () => {
    let obj = { name: 'the boy in the mirror ', des: 'slice of life ' };
    return mockRequest
      .post('/api/v1/videogames')
      .send(obj)
      .then(data => {
        return mockRequest.put(`/api/v1/videogames/${data.body._id}`)
          .send({ name: 'the boy in the mirror updated', des: 'slice of life ' })
          .then(results => {
            expect(results.status).toBe(200);
            expect(results.body.name).toEqual('the boy in the mirror updated');
          });
      });
  });

  it('delete one videogames', () => {
    let obj = { name: 'the boy in the mirror ', des: 'slice of life ' };
    return mockRequest
      .post('/api/v1/videogames')
      .send(obj)
      .then(data => {
        return mockRequest
          .delete(`/api/v1/videogames/${data.body._id}`)
          .send(obj)
          .then(() => {
            return mockRequest.get(`/api/v1/videogames/${data.body._id}`)
              .then(results => {
                expect(results.status).toBe(200);
                expect(results.body).toBeNull();
              });
          });
      });
  });

});
describe('Schema It Self',()=>{
it('add a new field into the maths ',()=>{
    let obj = { name: 'Algebra ', des: 'Algebra includes the study of algebraic structures.' ,more_info:' Algebra studies the effects of adding and multiplying numbers.'};
    return mockRequest
      .post('/api/v1/videogames')
      .send(obj)
      .then(data => {
        return mockRequest.put(`/api/v1/videogames/${data.body._id}`)
          .send({ name: 'Algebra', des: 'Algebra includes the study of algebraic structures.',more_info:' Algebra studies the effects of adding and multiplying numbers. updated' })
          .then(results => {
            expect(results.status).toBe(200);
            expect(results.body.more_info).toEqual(' Algebra studies the effects of adding and multiplying numbers. updated');
          });
      });
})
})


 console.log('%cHello World!', 'color: darkseagreen;’);