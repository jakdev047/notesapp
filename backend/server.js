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
