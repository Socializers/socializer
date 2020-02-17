/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable strict */
module.exports = (erorr,req,res,next)=>{
  res.status(500);
  res.statusMessage = 'Generic Server Erorr!';
  res.json({erorr:err,});
};
/**
   * modified res
   * res.status to 500
   * res.statusMessage to Generic Server Erorr
   * res.json with err
   */