// services/contrato/postContract.service.js
const { Contrato, Inquilino, Local } = require("../../../models/index.model");

const postContractService = async (data) => {
  const { inquilinoId, localId, ...contratoData } = data;

  const newContrato = await Contrato.create(contratoData);

  if (inquilinoId) {
    const inquilino = await Inquilino.findByPk(inquilinoId);
    if (inquilino) await newContrato.addInquilino(inquilino);
  }

  if (localId) {
    const local = await Local.findByPk(localId);
    if (local) await newContrato.addLocal(local);
  }

  return newContrato;
};

module.exports = postContractService;
