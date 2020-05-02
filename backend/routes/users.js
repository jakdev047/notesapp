const express = require('express');
const router = express.Router();

const {allUser,addUser} = require('../controllers/userController');

// all user get
router.get('/',allUser);

// add user
router.post('/',addUser);

module.exports = router;