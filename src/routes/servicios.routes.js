const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { createService, getAllServices, getServiceById, modifyServiceById, deleteServiceById } = require("../controllers/servicios.controllers");
const { validateInput } = require("../middlewares/validateInput");

//Crear servicio:
router.post("/crear", [
    check("nombre")
        .notEmpty().withMessage("Escriba el nombre del servicio")
        .trim()
        .isString().withMessage("Escriba un nómbre válido")
        .isLength({ min: 3, max: 50 }).withMessage("Escriba un nómbre válido"),
    check("descripcion")
        .optional({ checkFalsy: true })
        .trim()
        .isString().withMessage("Escriba una descripción válida")
        .isLength({ min: 10 }).withMessage("Escriba una descripción más larga (mínimo 10 caracteres)"),
    check("precio")
        .notEmpty().withMessage("Escriba el precio del servicio")
        .trim()
        .isFloat().withMessage("Escriba el precio en este formato: 00.00"),
    check("emailVendedor")
        .optional({ checkFalsy: true })
        .trim()
        .normalizeEmail()
        .isEmail().withMessage("Escriba un correo electrónico válido.")
        .isLength({ min: 5, max: 50 }).withMessage("Escriba un email válido válido"),
    validateInput
], createService);
//Obtener todos los servicios:
router.get("/", getAllServices);
//Obtener un servicio por ID:
router.get("/:id", [
    check("id").isMongoId().withMessage("Escriba ID correcto"), validateInput
], getServiceById);
//Actualizar un servicio por ID:
router.put("/:id", [
    check("id").isMongoId().withMessage("Escriba ID correcto"),
    check("nombre")
        .optional({ checkFalsy: true })
        .notEmpty().withMessage("Escriba el nombre del servicio")
        .trim()
        .isString().withMessage("Escriba un nómbre válido")
        .isLength({ min: 3, max: 50 }).withMessage("Escriba un nómbre válido"),
    check("descripcion")
        .optional({ checkFalsy: true })
        .trim()
        .isString().withMessage("Escriba una descripción válida")
        .isLength({ min: 10 }).withMessage("Escriba una descripción más larga (mínimo 10 caracteres)"),
    check("precio")
        .notEmpty().withMessage("Escriba el precio del servicio")
        .trim()
        .isFloat().withMessage("Escriba el precio en este formato: 00.00"),
    check("emailVendedor", "Escriba un correo electrónico válido.")
        .optional({ checkFalsy: true })
        .trim()
        .normalizeEmail()
        .isEmail()
        .isLength({ min: 5, max: 50 }),
    validateInput
], modifyServiceById);
//Eliminar un servicio por ID:
router.delete("/:id", [
    check("id").isMongoId().withMessage("Escriba ID correcto"),
    validateInput
], deleteServiceById);

module.exports = router;