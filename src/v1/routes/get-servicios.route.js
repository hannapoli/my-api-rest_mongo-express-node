const express = require("express");
const router = express.Router();
const getTodosServicios = require("../../controllers/get-servicios.controller");

router.get("/", getTodosServicios);

module.exports = router;