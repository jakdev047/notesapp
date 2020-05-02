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
const usersRoute = require('./routes/users');
const indexRoute = require('./routes');

// notes route
app.use('/notes',notesRoute);

// users route
app.use('/users',usersRoute);

// base route
app.use('/',indexRoute);

/* ============ Listen ============= */
app.listen(PORT,()=>{
  console.log(`${PORT} Server is Running...`)
});
