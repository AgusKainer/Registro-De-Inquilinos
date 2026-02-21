const { Contrato } = require("../../../models/index.model");

const deleteContractService = async (id, adminId) => {
  const deleted = await Contrato.destroy({ where: { id, adminId } });
  return deleted;
};

module.exports = deleteContractService;
