
const express = require("express");
const router = express.Router();
const eliminarServicioId = require("../../controllers/eliminar-servicio-id.controller");

router.delete("/", eliminarServicioId);

module.exports = router;