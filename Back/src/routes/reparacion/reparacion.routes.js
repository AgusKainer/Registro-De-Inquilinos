const express = require("express");
const upload = require("../../utils/multerConfig");
const postReparacionController = require("../../controller/reparacion/POST/postReparacion.controller");

const reparacionRoutes = express.Router();

reparacionRoutes.post(
  "/",
  upload.single("comprobante"),
  postReparacionController,
);

module.exports = reparacionRoutes;
