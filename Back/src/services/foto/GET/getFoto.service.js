const { Foto } = require("../../../models/index.model");

const getFotoService = async (adminId) => {
  const fotos = await Foto.findAll({
    where: { adminId },
  });
  return fotos;
};

module.exports = getFotoService;
