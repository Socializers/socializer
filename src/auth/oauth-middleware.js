/* eslint-disable camelcase */
/* eslint-disable strict */
'use strict';

const superagent = require('superagent');

// const Users = require('./user.js');

const API = 'http://localhost:3000/test';
const GTS = 'https://www.googleapis.com/oauth2/v4/token';
const SERVICE = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

module.exports = async function authorize(req, res, next) {
  try {
    let code = req.query.code;
    let access_token = await codeTokenExchanger(code);
    let remoteUser = await getRemoteUserInfo(access_token);
    console.log('try block', remoteUser);
    let validUser = await getUser(remoteUser);
    req.user = validUser;
    console.log('works');
    next();
  }
  catch (e) {
    next(e);
  }
};

async function codeTokenExchanger(code) {
  let tokenResponse = await superagent.post(GTS)
    .type('form')
    .send({
      code: code,
      client_id: '603858291976-q7b2li07s4gb54mo7gt2sc4ggp5h7pt7.apps.googleusercontent.com',
      client_secret: 'epO_Jcm_YPuMlGCmg-9c5kaH',
      redirect_uri: `${API}`,
      grant_type: 'authorization_code',
    });
  let access_token = tokenResponse.body.access_token;
  return access_token;
}

async function getRemoteUserInfo(token) {
  console.log('3rd Block');
  console.log('3rd Block',token);
  let userResponse = await superagent
    .get(SERVICE)
    .set('Authorization', `${token}`);
  console.log('aaaaaa', userResponse);
  let user = userResponse.body;
  user.access_token = token;
  return user;
}
async function getUser(oauthUser) {
  console.log('oauthUser', oauthUser);
  //   let user = await Users.createFromOAuth(oauthUser);
  //   let token = await actualRealUser.signupTokenGenerator(actualRealUser);
  //   return validUser;
}

