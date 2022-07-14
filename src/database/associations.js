const categoryModel = require('../models/Category');
const noteModel = require('../models/Notes');
const userModel = require('../models/User');

noteModel.belongsToMany(categoryModel, { through: 'NoteCategory' }, { timestamp: false });

categoryModel.belongsToMany(noteModel, { through: 'NoteCategory' }, { timestamp: false });