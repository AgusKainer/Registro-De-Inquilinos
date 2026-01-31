const { Router } = require("express");
const local = require("./local/local.routes");
const foto = require("./foto/foto.routes");
const authRoutes = require("./auth.routes");
const inquilino = require("./inquilino/inquilino.routes");
const contrato = require("./contrato/contrato.routes");

const router = Router();

router.use("/local", local);
router.use("/foto", foto);
router.use("/auth", authRoutes);
router.use("/inquilino", inquilino);
router.use("/contrato", contrato);

module.exports = router;
