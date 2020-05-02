const User = require('../models/users');

const { validationResult } = require('express-validator');

module.exports.allUser = async(req,res) => {
  try {
    const users = await User.find();
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
    const user = new User(req.body);
    const founduser = await User.findOne({email:req.body.email});
    if(founduser) {
      return res.status(400).send('User Alredy Register');
    }
    await user.save();
    res.status(200).json(user);
  } 
  catch (err) {
    res.status(500).send(err)
  }

};