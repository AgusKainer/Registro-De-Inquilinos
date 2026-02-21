const { Foto } = require("../../../models/index.model");

const deleteFotoService = async (id, adminId) => {
  const deleted = await Foto.destroy({ where: { id, adminId } });
  return deleted;
};

module.exports = deleteFotoService;
