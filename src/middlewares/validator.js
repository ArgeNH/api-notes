const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({
        success: false,
        error: error.array()
    });
    next();
}

module.exports = { validate };