const {
  Contrato,
  Inquilino,
  Local,
  Reparacion,
  Renovacion,
} = require("../../../models/index.model");

const getContratoByIdService = async (id, adminId) => {
  return await Contrato.findOne({
    where: { id, adminId },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      { model: Inquilino, attributes: { exclude: ["createdAt", "updatedAt"] } },
      { model: Local, attributes: { exclude: ["createdAt", "updatedAt"] } },
      {
        model: Reparacion,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: Renovacion,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });
};

module.exports = getContratoByIdService;
