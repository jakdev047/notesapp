const mongoose = require('mongoose');

module.exports.connectDB = async() => {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@dbh10.mlab.com:27107/notesapp`, 
    {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false})
    console.log('DataBase Connected Succesfully');
  } 
  catch (error) {
    console.log(err)
  }
}