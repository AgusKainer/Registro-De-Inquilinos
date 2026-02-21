const { Contrato } = require("../../../models/index.model");

const postContractService = async (data) => {
  const contrato = await Contrato.create({
    fechaDeIngreso: data.fechaDeIngreso,
    fechaVigente: data.fechaVigente,
    fechaDeAumento: data.fechaDeAumento,
    valor: Number(data.valor), // 🔥 CLAVE
    inquilinoId: data.inquilinoId,
    localId: data.localId,
    clausulas: data.clausulas || null,
    adminId: data.adminId,
  });

  return contrato;
};

module.exports = postContractService;
