const { response } = require('express');

const notecategory = require('../models/notecategory');
const noteModel = require('../models/Notes');
const categoryModel = require('../models/Category');

const createNote = async (req, res = response) => {
    const { title, content, category } = req.body;
    try {
        const noteCreate = await noteModel.create({
            title,
            content
        });

        const { idNote } = noteCreate;

        if (category !== undefined) {
            for (let i = 0; i < category.length; i++) {
                await notecategory.create({
                    noteIdNote: idNote,
                    categoryIdCategory: category[i]
                });
            }
        }

        return res.status(201).json({
            success: true,
            message: 'Note created successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getNotes = async (req, res = response) => {
    try {
        const notes = await noteModel.findAll({
            where: {
                isArchived: false
            },
            include: [{
                model: categoryModel,
                attributes: ['name'],
                through: {
                    attributes: ['noteIdNote', 'categoryIdCategory'],
                }
            }]
        });

        if (notes.length === 0)
            return res.status(400).json({
                success: false,
                message: 'Notes is empty'
            });

        return res.status(200).json({
            success: true,
            data: notes
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getNote = async (req, res = response) => {
    const { idNote } = req.params;
    try {
        const note = await noteModel.findByPk(idNote);

        if (!note)
            return res.status(400).json({
                success: false,
                message: 'Note not found'
            });

        return res.status(200).json({
            success: true,
            data: note
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateNote = async (req, res = response) => {
    const { idNote } = req.params;
    const { title, content, category } = req.body;
    try {
        const [updateRows] = await noteModel.update({
            title,
            content,
            category
        }, {
            where: {
                idNote: idNote
            }
        });

        if (updateRows === 0)
            return res.status(400).json({
                success: false,
                message: 'Note not found'
            });

        return res.status(200).json({
            success: true,
            message: 'Note updated successfully'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteNote = async (req, res = response) => {
    const { idNote } = req.params;
    try {
        const result = await noteModel.destroy({
            where: {
                idNote: idNote
            }
        });

        if (result === 0) {
            return res.status(400).json({
                success: false,
                message: 'Note not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Note deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const setNotesArchived = async (req, res = response) => {
    const { idNote } = req.params;
    try {
        const [updateRows] = await noteModel.update({
            isArchived: true
        }, {
            where: {
                idNote: idNote
            }
        });

        if (updateRows === 0)
            return res.status(400).json({
                success: false,
                message: 'Note not found'
            });

        return res.status(200).json({
            success: true,
            message: 'Note archived successfully'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const setNotesUnarchived = async (req, res = response) => {
    const { idNote } = req.params;
    try {
        const [updateRows] = await noteModel.update({
            isArchived: false
        }, {
            where: {
                idNote: idNote
            }
        });

        if (updateRows === 0)
            return res.status(400).json({
                success: false,
                message: 'Note not found'
            });

        return res.status(200).json({
            success: true,
            message: 'Note unarchived successfully'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getNotesArchived = async (req, res = response) => {
    try {
        const notes = await noteModel.findAll({
            where: {
                isArchived: true
            },
            include: [{
                model: categoryModel,
                attributes: ['name'],
                through: {
                    attributes: ['noteIdNote', 'categoryIdCategory'],
                }
            }]
        });

        if (notes.length === 0)
            return res.status(400).json({
                success: false,
                message: 'Notes is empty'
            });

        return res.status(200).json({
            success: true,
            data: notes
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getNotesByCategory = async (req, res = response) => {
    const { idCategory } = req.params;
    try {
        const category = await categoryModel.findByPk(idCategory, {
            include: [{
                model: noteModel,
                attributes: ['idNote', 'title', 'content', 'createdAt', 'updatedAt', 'isArchived'],
                through: {
                    attributes: ['noteIdNote', 'categoryIdCategory'],
                },
                where: {
                    isArchived: false
                }
            }]
        });
        return res.status(200).json({
            success: true,
            data: category
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const deleteOneNoteCategory = async (req, res = response) => {
    const { idNote, idCategory } = req.params;
    try {
        console.log(idNote, idCategory)
        await notecategory.destroy({
            where: {
                noteIdNote: idNote,
                categoryIdCategory: idCategory
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Category in note has been deleted successfully'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote,
    setNotesArchived,
    setNotesUnarchived,
    getNotesArchived,
    getNotesByCategory,
    deleteOneNoteCategory
}