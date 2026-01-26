const { Contrato } = require("../../../models/index.model");

const allContractServices = async () => {
  return await Contrato.findAll();
};

module.exports = allContractServices;
