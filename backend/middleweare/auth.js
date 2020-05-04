const jwt = require('jsonwebtoken');
const User = require('../models/users');

module.exports.auth = async(req,res,next) => {
  if(req.signedCookies) {
    // access token
    const token = req.signedCookies['auth'];
    try {
      // verified token
      const decoded = jwt.verify(token,'secretKey');
      // // user get
      const user = await User.findById(decoded.id);
      req.user = user;
      next();
    } 
    catch (error) {
      res.status(401).send('Unauthorize User!!!');
    }
  }
  else {
    res.status(401).send('Unauthorize User!!!');
  }
}