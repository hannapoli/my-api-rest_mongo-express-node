const express = require("express");
const router = express.Router();
const { createService, getAllServices, getServiceById, modifyServiceById, deleteServiceById } = require("../../controllers/servicios.controllers");

//Crear servicio:
router.post("/", createService);
//Obtener todos los servicios:
router.get("/", getAllServices);
//Obtener un servicio por ID:
router.get("/:id", getServiceById);
//Actualizar un servicio por ID:
router.put("/:id", modifyServiceById);
//Eliminar un servicio por ID:
router.delete("/:id", deleteServiceById);

module.exports = router;