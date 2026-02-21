const { Contrato, Inquilino, Local } = require("../../../models/index.model");

const getAllContractService = async (adminId) => {
  return await Contrato.findAll({
    where: { adminId },
    include: [{ model: Inquilino }, { model: Local }],
  });
};

module.exports = getAllContractService;
