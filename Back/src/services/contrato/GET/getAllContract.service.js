const { Contrato, Inquilino, Local } = require("../../../models/index.model");

const getAllContractService = async () => {
  return await Contrato.findAll({
    include: [
      {
        model: Inquilino,
        attributes: ["id", "nombre", "apellido", "dni"],
      },
      {
        model: Local,
        attributes: ["id", "direccion", "numero", "departamento"],
      },
    ],
  });
};

module.exports = getAllContractService;
