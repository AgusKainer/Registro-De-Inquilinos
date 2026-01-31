const {
  Contrato,
  Inquilino,
  Local,
  Reparacion,
  Renovacion,
} = require("../../../models/index.model");

const getContratoByIdService = async (id) => {
  return await Contrato.findByPk(id, {
    include: [
      {
        model: Inquilino,
      },
      {
        model: Local,
      },
      {
        model: Reparacion,
      },
      {
        model: Renovacion,
      },
    ],
  });
};

module.exports = getContratoByIdService;
