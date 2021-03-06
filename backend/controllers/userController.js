const User = require('../models/users');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const _ = require('lodash');

module.exports.allUser = async(req,res) => {
  try {
    const users = await User.find({},'-password');
    if(users.length === 0) {
      return res.status(404).send("Users not Created")
    }
    else {
      return res.status(200).send(users)
    }
  } 
  catch (error) {
    console.log(error)
  }
};

module.exports.addUser = async(req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  try {
    const pickedProperty = _.pick(req.body,['firstName','lastName','email','password','confirmPassword']);
    const user = new User(pickedProperty);
    const founduser = await User.findOne({email:req.body.email});
    if(founduser) {
      return res.status(400).send('User Alredy Register');
    }
    // generate auth token
    const token = user.generateAuthToken();
    res.cookie('auth',token,{
      httpOnly: true,
      sameSite: true,
      signed: true,
      maxAge: 2 * 60 * 60 * 1000
    });
    await user.save();
    res.status(200).json({token});
  } 
  catch (err) {
    res.status(500).send(err)
  }

};

module.exports.singleUser = async(req,res) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id,'-password');
    if(user) {
      return res.status(200).send(user)
    }
    else {
      return res.status(404).send("User not Found")
    }
  } 
  catch (error) {
    console.log(error)
  }
};

module.exports.loginController = async(req,res) => {
  // data capture 
  const {email,password} = req.body;
  try {
    // check user email & password
    const user = await User.findOne({email:email});
    if(!user){
      return res.status(400).send('Unable to Login');
    }
    const isMatchedPassword = bcrypt.compare(password,user.password);
    if(!isMatchedPassword){
      return res.status(400).send('Unable to Login');
    }
    // generate auth token
    const token = user.generateAuthToken();
    res.cookie('auth',token,{
      httpOnly: true,
      sameSite: true,
      signed: true,
      maxAge: 2 * 60 * 60 * 1000
    });
    // success msg
    res.json({token});
    } 
  catch (error) {
    console.log(error)
  }
};

module.exports.logOutController = (req,res) => {
  // res.clearCookie('auth');
  // res.send('Successfully logout');
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.json({
    msg: 'Logout Success'
  })
}