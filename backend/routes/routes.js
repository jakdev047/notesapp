const express = require('express');
const router = express.Router();

const { check} = require('express-validator');

const {
  addNoteController,
  getAllNotesController,
  getSingleNoteController,
  updateNoteController,
  deleteNoteController
} = require('../controllers/notesControllers');

const {auth} = require('../middleweare/auth');

// adding note
router.post('/',[
    auth,
    check('title').notEmpty().isLength({min:3,max:50}).withMessage('Titile is Required & must 3 to 50 charecter'),
    check('comment').notEmpty().isLength({min:5,max:500}).withMessage('Comment is Required & must 5 to 500 charecter')
  ],addNoteController);

// notes route
router.get('/',getAllNotesController);

// single note route
router.get('/:id',[check('id','Note not Found').isMongoId()],getSingleNoteController);

// update note
router.put('/:id',[
  auth,
  check('id','Note No Found').isMongoId(),
  check('title','title is required').optional().notEmpty(),
  check('comment','comment is required').optional().notEmpty(),
  ],updateNoteController)

// delete note
router.delete('/:id',[auth,check('id','Note Not Found').isMongoId()],deleteNoteController);

module.exports = router;
