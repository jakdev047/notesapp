const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

const {allUser,addUser} = require('../controllers/userController');

// all user get
router.get('/',allUser);

// add user
router.post('/',[
  check('firstName','firstName is required').notEmpty(),
  check('lastName','lastName is required').notEmpty(),
  check('email','email is required').notEmpty(),
  check('email','emailmust be valid').isEmail(),
  check('password','password is required').notEmpty(),
  check('password','Password must be more than 6 character').isLength({min:6}),
  check('confirmPassword','confirmPassword is required').notEmpty(),
  check('confirmPassword').custom((value,{req})=> {
    if(value !== req.body.password) {
      throw new Error('Confirm Password dont\'t match ')
    }
    else {
      return true
    }
  })
],addUser);

module.exports = router;