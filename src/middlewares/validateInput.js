const { validationResult } = require("express-validator");

const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            message: "Error de validación de datos.",
            errors: errors.mapped()
        });
    };
    next();
}

module.exports = { validateInput };