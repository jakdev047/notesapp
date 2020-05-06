const jwt = require('jsonwebtoken');
const User = require('../models/users');

module.exports.admin = (req,res,next) => {
  if(!req.user.isAdmin) {
    return res.status(403).send('You are not allowed to access')
  }
  next();
};