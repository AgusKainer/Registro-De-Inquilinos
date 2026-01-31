const { Router } = require("express");
const getByDni = require("../../controller/inquilino/GET/getByDniInquilino.controller");
const getAll = require("../../controller/inquilino/GET/getAllInquilino.controller");
const postInquilino = require("../../controller/inquilino/POST/postInquilino.controller");
const putInquilino = require("../../controller/inquilino/PUT/putInquilino.controller");
const deleteInquilino = require("../../controller/inquilino/DELETE/deleteInquilino.controller");

const inquilino = Router();

inquilino.get("/dni/:dni", getByDni);
inquilino.get("/", getAll);
inquilino.post("/", postInquilino);
inquilino.put("/:id", putInquilino);
inquilino.delete("/:id", deleteInquilino);

module.exports = inquilino;
