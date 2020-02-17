'use strict';

const superagent = require('superagent');
const Users = require('../auth/user.js');

const authorize = (req) => {

  let code = req.query.code;
  console.log('(1) CODE:', code);

  return superagent.post('https://oauth2.googleapis.com/token')
    .type('form')
    .send({
      code: code,
      client_id: '603858291976-q7b2li07s4gb54mo7gt2sc4ggp5h7pt7.apps.googleusercontent.com',
      client_secret: 'epO_Jcm_YPuMlGCmg-9c5kaH',
      redirect_uri: 'http://localhost:3000/oauth',
      grant_type: 'authorization_code',
    })
    .then( response => {
      let access_token = response.body.access_token;
      console.log('(2) ACCESS TOKEN:', access_token);
      return access_token;
    })
    .then(token => {
      console.log(' 3rd token ',token);
      
      return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
        .set('Authorization', `Bearer ${token}`)
        .then( response => {
          let user = response.body;
          user.access_token = token;
          console.log('(3) GOOGLEUSER', user);
          return user;
        });
    })
    .then(oauthUser => {
      console.log('(4) CREATE ACCOUNT');
      return Users.createFromOauth(oauthUser)
        .then(actualRealUser => {
          console.log('(5) ALMOST ...', actualRealUser);
         return req.token = Users.signupTokenGenerator(actualRealUser);
          console.log('req.token',req.token)
        })
        }).catch(error => error);
    };
module.exports = authorize;