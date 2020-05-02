const User = require('../models/users');

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
  
};