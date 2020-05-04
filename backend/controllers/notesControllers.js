const { validationResult } = require('express-validator');
const Note = require('../models/notes');

module.exports.addNoteController = async(req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const newNote = new Note(req.body);
    await newNote.save();
    res.status(200).json(newNote);
  } 
  catch (err) {
    res.status(500).send(err)
  }
};

module.exports.getAllNotesController = async(req,res)=>{
  console.log(req.user);
  try {
    const notes = await Note.find(); // all notes collections
    if( notes.length == 0) {
      return res.status(404).json({
        msg: 'No Notes Found or Not Yet Created'
      });
    }
    else {
      return res.status(200).json(notes);
    }
  } 
  catch (error) {
    res.status(500).send(err)
  }
};

module.exports.getSingleNoteController = async(req,res)=>{
  const id = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const note = await Note.findById(id);
    if ( note) {
      return res.status(200).send(note);
    }
    else {
      res.status(404).json({
        msg: 'Notes Not Found'
      });
    }
  } 
  catch (error) {
    res.status(500).send(err)
  }
};

module.exports.updateNoteController = async(req,res)=>{

  const updateNoteId = req.params.id; // id

  const gotUserInput = Object.keys(req.body); // id, title, comment
  const allowUpdates = ['title','comment']; // title, comment
  const isAllowed = gotUserInput.every( update => allowUpdates.includes(update)); // false

  if(!isAllowed) {
    return res.status(400).json({
      msg: 'Invalid Updates'
    })
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  try {
    const updateNote = await Note.findByIdAndUpdate(updateNoteId,req.body,{
      new:true,
      runValidators:true
    });

    if(!updateNote) return res.status(404).send('Note Not Found');
    res.status(200).send(updateNote);
    
  } 
  catch (error) {
    res.status(500).send(err)
  }
}

module.exports.deleteNoteController = async(req,res)=>{
  const deleteId = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const deleteNote = await Note.findByIdAndDelete(deleteId);
    if(deleteNote){
      return res.status(200).send(deleteNote);
    }
    else{
      return res.status(404).json({
        msg: 'Not Not Found!!!'
      });
    }
  } 
  catch (error) {
    return res.status(500).json('Internal Server Error')
  }
};