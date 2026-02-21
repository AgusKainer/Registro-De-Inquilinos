const { Router } = require("express");
const getAll = require("../../controller/local/GET/getAllLocal.controller");
const getId = require("../../controller/local/GET/getIdLocal.controller");
const postLocal = require("../../controller/local/POST/postLocal.controller");
const putLocal = require("../../controller/local/PUT/putLocal.controller");
const deleteLocal = require("../../controller/local/DELETE/deleteLocal.controller");

const upload = require("../../utils/multerConfig");

const local = Router();

local.get("/", getAll);
local.get("/:id", getId);
local.post("/", upload.array("fotos"), postLocal);
local.put("/:id", upload.array("fotos"), putLocal);
local.delete("/:id", deleteLocal);

module.exports = local;
