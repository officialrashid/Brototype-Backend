const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'd2365790aadbaef646d8825c53a3e3822447333cd0898f2d1df5854ffbaf8f9375d66c0156ed9a68f6432e84ea6de0d77424834ff57bedd55a4bd9b719b3fde3'; // Replace with a strong, unique secret key

// Middleware to check JWT token on protected routes
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']
  console.log(token,"sfhjsbvhjbvhbhj");
if (token){
    console.log('667668767686687678678');
  jwt.verify(token, secretKey, (err, user) => {
    if (err){
        return res.json({status:false,message:"verify token not found"});
    } 
    req.user = user;
    next();
  });
} else{
    return res.json({status:false,message:"token not found"});
}

}
module.exports = authenticateToken;