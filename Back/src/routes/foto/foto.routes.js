const { Router } = require("express");
const getAll = require("../../controller/foto/GET/getAllFoto.controller");
const getId = require("../../controller/foto/GET/getIdFoto.controller");
const postFoto = require("../../controller/foto/POST/postFoto.controller");
const deleteFoto = require("../../controller/foto/DELETE/deleteFoto.controller");

const foto = Router();

foto.get("/", getAll);
foto.get("/:id", getId);
foto.post("/", postFoto);
foto.delete("/:id", deleteFoto);

module.exports = foto;
