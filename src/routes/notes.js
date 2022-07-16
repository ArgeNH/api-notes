const { Router } = require('express');
const { check } = require('express-validator');

const {
    createNote,
    getNotes,
    getNote,
    deleteNote,
    updateNote,
    getNotesArchived,
    getNotesByCategory,
    setNotesArchived,
    setNotesUnarchived
} = require('../controller/notes');
const { validate } = require('../middlewares/validator');

const router = Router();

router.get('/', getNotes); //✅
router.get('/:idNote', getNote); //✅
router.post('/new-note', [
    check('title').not().isEmpty().withMessage('Title is required'),
    check('content').not().isEmpty().withMessage('Content is required')
    , validate], createNote); //✅
router.delete('/delete-note/:idNote', deleteNote); //✅
router.patch('/update-note/:idNote', [
    check('title').not().isEmpty().withMessage('Title is required'),
    check('content').not().isEmpty().withMessage('Content is required')
    , validate], updateNote);  //✅

router.patch('/set-notes-archived/:idNote', setNotesArchived); //✅
router.patch('/set-notes-unarchived/:idNote', setNotesUnarchived); //✅

router.get('/archived/notes', getNotesArchived); //✅
router.get('/category/notes/:idCategory', getNotesByCategory); //✅

module.exports = router;