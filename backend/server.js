/* =============== Require Files ================ */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

/* ============ Port ============= */
const PORT = process.env.PORT || 8080;

/* ============ Model============= */

/* ============ Controller ============= */


/* ============ Connecting mongodb ============= */
const {connectDB} = require('./db/dbConnect');

connectDB();

/* =============== Middleweare ================ */
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/* ============ Route ============= */

const notesRoute = require('./routes/routes');

// home route
app.get('/',(req,res)=>{
  res.status(200).json({
    message: `Welcome My Notes App`
  });
});

// notes route
app.use('/notes',notesRoute);


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
