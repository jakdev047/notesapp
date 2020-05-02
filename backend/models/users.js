const mongoose = require('mongoose');
const validator = require('validator'); 

const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    firstName:  { 
      type: String,
      required: [true,'First Name is Required'] 
    },
    lastName:  { 
      type: String,
      required: [true,'Last Name is Required'] 
    },
    email:  { 
      type: String,
      unique:true,
      trim:true,
      required: [true,'Email is Required'],
      validate: {
        validator(value) {
          return validator.isEmail(value)
        },
        message: " Must be a valid Email"
      } 
    },
    password:  { 
      type: String,
      minlength:[6,'Password must be more than 6 character'],
      required: [true,'Password is Required'],
      validate:{
        validator(value){
          return !value.toLowerCase().includes('password');
        },
        message: " Password must not contain 'password' "
      }
    }
  },
  {timestamps: true}
);

const User = mongoose.model('User', usersSchema);

module.exports = User;