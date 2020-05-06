/* =============== Require Files ================ */
const express = require('express');
require('dotenv').config({path:'./config/key.env'})
const cors = require('cors');
const bodyParser = require('body-parser');
const cookiParser = require('cookie-parser');

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
app.use(cookiParser(process.env.COOKIES_SECRET));

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
