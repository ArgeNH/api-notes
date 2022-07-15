const categoryModel = require('../models/Category');
const notecategory = require('../models/notecategory');
const noteModel = require('../models/Notes');
const userModel = require('../models/User');

noteModel.belongsToMany(categoryModel, { through: 'notecategory' });

categoryModel.belongsToMany(noteModel, { through: 'notecategory' });
