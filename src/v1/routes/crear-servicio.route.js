const express = require("express");
const router = express.Router();
const crearServicio = require("../../controllers/crear-servicio.controller");

router.post("/", crearServicio);

module.exports = router;