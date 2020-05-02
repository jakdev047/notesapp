/* =============== Require Files ================ */
const express = require('express');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

/* ============ Port ============= */
const PORT = process.env.PORT || 8080;

/* ============ Model============= */
const Note = require('./models/notes');

/* ============ Connecting mongodb ============= */
mongoose
.connect('mongodb://localhost:27017/notesapp', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false})
.then( () => console.log('DataBase Connected Succesfully'))
.catch( err => console.log(err));


/* =============== Middleweare ================ */
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/* ============ Route ============= */

// home route
app.get('/',(req,res)=>{
  res.status(200).json({
    message: `Welcome My Notes App`
  });
});

// adding note
app.post('/notes',[
    check('title').notEmpty().isLength({min:3,max:50}).withMessage('Titile is Required & must 3 to 50 charecter'),
    check('comment').notEmpty().isLength({min:5,max:500}).withMessage('Comment is Required & must 5 to 500 charecter')
  ],
  async(req,res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const newNote = new Note(req.body);
      await newNote.save();
      res.status(200).json(newNote);
      // notes = [...notes,newNote];
      // res.status(202).json(notes);
    } 
    catch (err) {
      res.status(500).send(err)
    }
});

// notes route
app.get('/notes',async(req,res)=>{
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
});

// single note route
app.get('/notes/:id',check('id','Note not Found').isMongoId(),async(req,res)=>{
  const id = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const note = await Note.findById(id);
    if ( note) {
      return res.status(200).json(note);
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
});

// update note
app.put('/notes/:id',[
  check('id','Note No Found').isMongoId(),
  check('title','title is required').optional().notEmpty(),
  check('comment','comment is required').optional().notEmpty(),
  ],async(req,res)=>{

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
})

// delete note
app.delete('/notes/:id',check('id','Note Not Found').isMongoId(),async(req,res)=>{
  const deleteId = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const deleteNote = await Note.findByIdAndDelete(deleteId);
    if(deleteNote){
      return res.status(200).json(notes);
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
})

// not found route
app.get('*',(req,res)=> {
  res.status(404).json({
    error: '404 Not Found'
  })
})

/* ============ Listen ============= */
app.listen(PORT,()=>{
  console.log(`${PORT} Server is Running...`)
});
