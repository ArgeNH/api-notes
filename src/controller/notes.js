const { response } = require('express');
const noteModel = require('../models/Notes');

const createNote = async (req, res = response) => {
    const { title, content, category } = req.body;
    try {
        await noteModel.create({
            title,
            content,
            category
        });

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
        const notes = await noteModel.findAll();

        if (notes.length === 0)
            return res.status(204).json({
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
            return res.status(404).json({
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
            return res.status(404).json({
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
            return res.status(404).json({
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
            return res.status(404).json({
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

const getNotesArchived = async (req, res = response) => {
    try {
        const notes = await noteModel.findAll({
            where: {
                isArchived: true
            }
        });

        if (notes.length === 0)
            return res.status(204).json({
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

const getNotesByCategory = async (req, res = response) => { };

module.exports = {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote,
    setNotesArchived,
    getNotesArchived,
    getNotesByCategory
}