const { Contrato } = require("../../../models/index.model");

const deleteContractService = async (id) => {
  const deleted = await Contrato.destroy({ where: { id } });
  return deleted;
};

module.exports = deleteContractService;
