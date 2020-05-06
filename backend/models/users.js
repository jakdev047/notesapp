const mongoose = require('mongoose');
const validator = require('validator'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  {timestamps: true}
);

usersSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({id: this._id,isAdmin:this.isAdmin},process.env.COOKIES_SECRET,{expiresIn:'2h'});
  return token;
}

usersSchema.pre('save',async function(next){
  const hasesPassword = await bcrypt.hash(this.password,10);
  if(this.isModified('password')) {
    this.password = hasesPassword;
  }
  next();
})

const User = mongoose.model('User', usersSchema);

module.exports = User;