const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notesSchema = new Schema(
  {
    title:  { 
      type: String,
      minlength: [3,'Title must be 3 char in minimum'],
      maxlength: [50,'Title must be 50 char in maximum'],
      required: [true,'Title is Required'] 
    },
    comment:  { 
      type: String,
      minlength: [10,'Title must be 10 char in minimum'],
      maxlength: [500,'Title must be 500 char in maximum'],
      required: [true,'Title is Required'] 
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Note = mongoose.model('Note', notesSchema);

module.exports = Note;