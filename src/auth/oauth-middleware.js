'use strict';
const superagent = require('superagent');
const Users = require('./user.js');
const API = 'http://localhost';
const GTS = 'https://www.googleapis.com/oauth2/v4/token';
const SERVICE = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

const authorize = (req) => {
let code = req.query.code;
return superagent.post(GTS)
 .type('form')
 .send({
     code:code,
     client_id:'603858291976-q7b2li07s4gb54mo7gt2sc4ggp5h7pt7.apps.googleusercontent.com',
     client_secret:'epO_Jcm_YPuMlGCmg-9c5kaH',
     redirect_uri:`${API}`,
     grant_type:'authorization_code',
 })
 .then( response => {
     let access_token = response.body.access_token;
     return access_token;
 })
 .then(token => {
     return superagent.get(SERVICE)
     .set('Authorization',`Bearer${token}`)
     .then( response => {
         let user = response.body;
         user.access_token =token;
         return user;
     })
 })
 .then(oauthUser => {
     return Users.createFromOAuth(oauthUser)
 })
 .then(actualRealUser => {
     return actualRealUser.signupTokenGenerator();
 })
 .catch(error => error);
}
module.exports = {authorize};