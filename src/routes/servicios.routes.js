const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { createService, getAllServices, getServiceById, modifyServiceById, deleteServiceById } = require("../controllers/servicios.controllers");
const { validateInput } = require("../middlewares/validateInput");
const { verifyRole } = require("../middlewares/verifyRole");
const { verifyJWT } = require("../middlewares/verifyJWT");

//Las rutas públicas:
//Obtener todos los servicios:
router.get("/", getAllServices);
//Obtener un servicio por ID:
router.get("/:id", [
    check("id").isMongoId().withMessage("Escriba el ID correcto"), validateInput
], getServiceById);

//Las siguientes rutas de servicios necesitan autentificación:
router.use(verifyJWT);

//Las rutas para los administradores:
//Crear servicio:
router.post("/nuevo", [
    check("nombre")
        .notEmpty().withMessage("Escriba el nombre del servicio").bail()
        .trim()
        .isString().withMessage("Escriba un nómbre válido")
        .isLength({ min: 3, max: 50 }).withMessage("Escriba un nómbre válido"),
    check("descripcion")
        .optional({ checkFalsy: true })
        .trim()
        .isString().withMessage("Escriba una descripción válida")
        .isLength({ min: 10 }).withMessage("Escriba una descripción más larga (mínimo 10 caracteres)"),
    check("precio")
        .notEmpty().withMessage("Escriba el precio del servicio").bail()
        .trim()
        .isFloat({gt: 0}).withMessage("Escriba el precio (mayor que 0) en este formato: 00.00"),
    check("emailVendedor")
        .optional({ checkFalsy: true })
        .trim()
        .normalizeEmail()
        .isEmail().withMessage("Escriba un correo electrónico válido.").bail()
        .isLength({ min: 5, max: 50 }).withMessage("Escriba un email válido válido"),
    validateInput, verifyRole("admin")
], createService);

//Actualizar un servicio por ID:
router.put("/:id", [
    check("id").isMongoId().withMessage("Escriba ID correcto"),
    check("nombre")
        .optional({ checkFalsy: true })
        .notEmpty().withMessage("Escriba el nombre del servicio").bail()
        .trim()
        .isString().withMessage("Escriba un nómbre válido")
        .isLength({ min: 3, max: 50 }).withMessage("Escriba un nómbre válido"),
    check("descripcion")
        .optional({ checkFalsy: true })
        .trim()
        .isString().withMessage("Escriba una descripción válida")
        .isLength({ min: 10 }).withMessage("Escriba una descripción más larga (mínimo 10 caracteres)"),
    check("precio")
        .notEmpty().withMessage("Escriba el precio del servicio").bail()
        .trim()
         .isFloat({gt: 0}).withMessage("Escriba el precio (mayor que 0) en este formato: 00.00"),
    check("emailVendedor", "Escriba un correo electrónico válido.")
        .optional({ checkFalsy: true })
        .trim()
        .normalizeEmail()
        .isEmail().bail()
        .isLength({ min: 5, max: 50 }),
    validateInput, verifyRole("admin")
], modifyServiceById);

//Eliminar un servicio por ID:
router.delete("/:id", [
    check("id").isMongoId().withMessage("Escriba el ID correcto"),
    validateInput, verifyRole("admin")
], deleteServiceById);

module.exports = router;