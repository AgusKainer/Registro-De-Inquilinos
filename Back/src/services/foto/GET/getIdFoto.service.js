const { Foto } = require("../../../models/index.model");

const getIdFotoService = async (id, adminId) => {
  const foto = await Foto.findByPk(id, {
    where: { id, adminId },
  });
  return foto;
};

module.exports = getIdFotoService;
