/* ===============
    Require Files
  ================
*/
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

/* ============
    Port
  =============
*/
const PORT = process.env.PORT || 8080;

/* ===============
    Middleweare
  ================
*/
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/* ============
    Route
  =============
*/

// home route
app.get('/',(req,res)=>{
  res.status(200).json({
    message: `Welcome My Notes App`
  });
});

let notes = [
  {id:1,title:'Note One',comment: 'This First Note'},
  {id:2,title:'Note Two',comment: 'This Second Note'}
]

// notes route
app.get('/notes',(req,res)=>{
  if( notes.length == 0) {
    return res.status(404).json({
      msg: 'No Notes Found or Not Yet Created'
    });
  }
  else {
    return res.status(200).json(notes);
  }
});

// single note route
app.get('/notes/:id',(req,res)=>{
  const id = parseInt(req.params.id);
  const note = notes.find(item => item.id === id);
  if ( note) {
    return res.status(200).json(note);
  }
  else {
    res.status(404).json({
      msg: 'Notes Not Found'
    });
  }
});

// adding note
app.post('/notes',(req,res)=> {
  const newNote = req.body;
  notes = [...notes,newNote];
  res.status(202).json(notes);
});

// update note
app.put('/notes/:id',(req,res)=>{
  const updateNoteId = parseInt(req.params.id); // id
  const updateNoteInput = req.body; // {id,title,comment}
  const gotUserInput = Object.keys(updateNoteInput); // id, title, comment
  const allowUpdates = ['title','comment']; // title, comment
  try{
    const isAllowed = gotUserInput.every( update => allowUpdates.includes(update)); // false
    if(!isAllowed) {
      return res.status(400).json({
        msg: 'Invalid Oparation'
      })
    }
    const note = notes.find(note=>note.id === updateNoteId);
    if(note){
      //success update
      return notes = notes.map(note => {
        if( note.id === updateNoteId) {
          return res.status(202).json({
            ...note,
            ...updateNoteInput
          })
        }
        else {
          return res.status(202).json(note);
        }
      })
    }
    else {
      // deal with note that note found
      return res.status(400).json({
        msg: 'Not Note Found'
      })
    }
  }
  // server error
  catch(err){
    return res.status(500).json('Internal Server Error')
  };
})

// delete note
app.delete('/notes/:id',(req,res)=>{
  const deleteId = parseInt(req.params.id);
  try {
    const deleteNote = notes.find(note=>note.id === deleteId);
    if(deleteNote){
      notes = notes.filter(note=> note.id !== deleteId);
      return res.status(202).json(notes);
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

/* ============
    Listen
  =============
*/
app.listen(PORT,()=>{
  console.log(`${PORT} Server is Running...`)
});
