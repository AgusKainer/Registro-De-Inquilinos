const { Reparacion } = require("../../../models/index.model");

const postReparacionService = async (data) => {
  return await Reparacion.create(data);
};

module.exports = postReparacionService;
