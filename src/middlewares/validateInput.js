const { validationResult } = require("express-validator");

const validateInput = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        const err = new Error("Error de validación de datos.");
        err.status = 400;
        err.errors = errores.mapped();
        return next(err);
    };
    next();
}

module.exports = { validateInput };