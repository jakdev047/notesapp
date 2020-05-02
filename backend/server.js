/* =============== Require Files ================ */
const express = require('express');
const mongoose = require('mongoose');
const { check,validationResult} = require('express-validator');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

/* ============ Port ============= */
const PORT = process.env.PORT || 8080;

/* ============ Model============= */
const Note = require('./models/notes');

/* ============ Controller ============= */
const {addNoteController,getAllNotesController,getSingleNoteController,updateNoteController,deleteNoteController} = require('./controllers/notesControllers');

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
  ],addNoteController);

// notes route
app.get('/notes',getAllNotesController);

// single note route
app.get('/notes/:id',check('id','Note not Found').isMongoId(),getSingleNoteController);

// update note
app.put('/notes/:id',[
  check('id','Note No Found').isMongoId(),
  check('title','title is required').optional().notEmpty(),
  check('comment','comment is required').optional().notEmpty(),
  ],updateNoteController)

// delete note
app.delete('/notes/:id',check('id','Note Not Found').isMongoId(),deleteNoteController)

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
