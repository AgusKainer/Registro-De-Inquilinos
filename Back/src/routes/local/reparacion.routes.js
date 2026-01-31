const express = require("express");
const upload = require("../utils/multer");
const postReparacion = require("../controller/reparacion/POST/postReparacion.controller");

const router = express.Router();

router.post("/", upload.single("comprobante"), postReparacion);

module.exports = router;
