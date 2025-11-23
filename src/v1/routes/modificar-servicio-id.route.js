const express = require("express");
const router = express.Router();
const modificarServicioId = require("../../controllers/modificar-servicio-id.controller");

router.put("/", modificarServicioId);

module.exports = router;