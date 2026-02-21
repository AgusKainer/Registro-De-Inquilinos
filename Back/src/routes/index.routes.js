const { Router } = require("express");
const local = require("./local/local.routes");
const foto = require("./foto/foto.routes");
const inquilino = require("./inquilino/inquilino.routes");
const contrato = require("./contrato/contrato.routes");
const reparacion = require("./reparacion/reparacion.routes");

const router = Router();

router.use("/local", local);
router.use("/foto", foto);
router.use("/inquilino", inquilino);
router.use("/contrato", contrato);
router.use("/reparacion", reparacion);

module.exports = router;
