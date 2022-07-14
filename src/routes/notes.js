const { Router } = require('express');

const {
    createNote,
    getNotes,
    getNote,
    deleteNote,
    updateNote,
    getNotesArchived,
    getNotesByCategory,
    setNotesArchived
} = require('../controller/notes');
const { validate } = require('../middlewares/validator');

const router = Router();

router.get('/', getNotes); //✅
router.get('/:idNote', getNote); //✅
router.post('/new-note', createNote); //✅
router.delete('/delete-note/:idNote', deleteNote); //✅
router.patch('/update-note/:idNote', updateNote);  //✅

router.patch('/set-notes-archived/:idNote', setNotesArchived); //✅

router.get('/archived/notes', getNotesArchived); //✅
router.get('/category/notes', getNotesByCategory);

module.exports = router;