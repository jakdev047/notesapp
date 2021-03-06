const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

const {allUser,addUser,singleUser,loginController,logOutController} = require('../controllers/userController');

const {auth} = require('../middleweare/auth');
const {admin} = require('../middleweare/admin');

// all user get
router.get('/',[auth,admin],allUser);

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

// single user get
router.get('/me',auth,singleUser);

// login 
router.post('/login',loginController);

// logout
router.get('/logout',auth,logOutController);

module.exports = router;