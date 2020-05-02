const mongoose = require('mongoose');

module.exports.connectDB = async() => {
  try {
    await mongoose.connect('mongodb://localhost:27017/notesapp', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false})
    console.log('DataBase Connected Succesfully');
  } 
  catch (error) {
    console.log(err)
  }
}