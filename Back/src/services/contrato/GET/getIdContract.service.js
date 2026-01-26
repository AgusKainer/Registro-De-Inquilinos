const { Contrato } = require("../../../models/index.model");

const getIdContractService = async ({ id }) => {
  return await Contrato.findByPk(id);
};

module.exports = getIdContractService;
