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
  res.json({
    message: `Welcome My Notes App`
  });
});

const notes = [
  {id:1,title:'Note One',comment: 'This First Note'},
  {id:2,title:'Note Two',comment: 'This Second Note'}
]

// notes route
app.get('/notes',(req,res)=>{
  res.json(notes);
});

// single note route
app.get('/notes/:id',(req,res)=>{
  const id = req.params.id;
  const note = notes.filter(item => item.id === parseInt(id));
  res.json(note);
});

// not found route
app.get('*',(req,res)=> {
  res.json({
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
