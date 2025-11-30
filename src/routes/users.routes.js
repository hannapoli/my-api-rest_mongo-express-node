const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { createUser, loginUser, renewToken } = require("../controllers/users.controllers");
const { validateInput } = require("../middlewares/validateInput");
const { verifyJWT } = require("../middlewares/verifyJWT");
const { verifyRole } = require("../middlewares/verifyRole");

//Registrarse:
router.post("/new", [
    check("name")
        .notEmpty().withMessage("Escriba el nombre").bail()
        .trim()
        .isString().withMessage("Escriba un nómbre válido")
        .isLength({ min: 3, max: 50 }).withMessage("Escriba un nómbre válido"),
    check("email")
        .trim()
        .normalizeEmail()
        .isEmail().withMessage("Escriba un correo electrónico válido.").bail()
        .isLength({ min: 5, max: 50 }).withMessage("Escriba un email válido válido"),
    check("password", "La contraseña debe tener entre 6 y 10 caracteres, contener por lo menos una minúscula, una mayúscula, un número y un símbolo.")
        .isStrongPassword({ minLength: 6 }).bail()
        .isLength({ max: 10 }),
    validateInput
], createUser);

//Logearse:
router.post("/", [
    check("email")
        .trim()
        .normalizeEmail()
        .isEmail().withMessage("Escriba un correo electrónico válido.").bail()
        .isLength({ min: 5, max: 50 }).withMessage("Escriba un email válido válido"),
    check("password", "La contraseña debe tener entre 6 y 10 caracteres, contener por lo menos una minúscula, una mayúscula, un número y un símbolo.")
        .isStrongPassword({ minLength: 6 }).bail()
        .isLength({ max: 50 }),
    validateInput
], loginUser);

//Renovar el token:
router.get("/renew", [
    verifyJWT
], renewToken);

module.exports = router;