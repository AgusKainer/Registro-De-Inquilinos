const { Router } = require("express");
const getAll = require("../../controller/contrato/GET/getAllContrato.controller");
const getId = require("../../controller/contrato/GET/getIdContracto.controller");
const postContrato = require("../../controller/contrato/POST/postContrato.controller");
const putContrato = require("../../controller/contrato/PUT/putContrato.controller");
const deleteContrato = require("../../controller/contrato/DELETE/deleteContrato.controller");
const upload = require("../../utils/multerConfig");
const renovarContratoController = require("../../controller/contrato/POST/renovarContrato.controller");

const contrato = Router();

contrato.get("/", getAll);
contrato.get("/:id", getId);
contrato.post("/", upload.single("clausulas"), postContrato);
contrato.put("/:id", putContrato);
contrato.delete("/:id", deleteContrato);
contrato.post(
  "/:id/renovar",
  upload.single("clausulas"),
  renovarContratoController,
);

module.exports = contrato;
