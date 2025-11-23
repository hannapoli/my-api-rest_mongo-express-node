const express = require("express");
const router = express.Router();
const getServicioId = require("../../controllers/get-servicio-id.controller");

router.get("/", getServicioId);

module.exports = router;