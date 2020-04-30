// require files
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// port
const PORT = process.env.PORT || 8080;

// middleweare
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// route
app.get('/',(req,res)=>{
  res.json({
    message: `Welcome My Notes App`
  });
});

app.get('*',(req,res)=> {
  res.json({
    error: '404 !!!'
  })
})

// listen
app.listen(PORT,()=>{
  console.log(`${PORT} Server is Running...`)
});
