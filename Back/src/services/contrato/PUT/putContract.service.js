const {
  Contrato,
  Inquilino,
  Local,
  Reparacion,
  Renovacion,
} = require("../../../models/index.model");

const putContractService = async (id, data, adminId) => {
  // Encontrar el contrato asegurando que pertenece al admin
  const contrato = await Contrato.findOne({ where: { id, adminId } });
  if (!contrato) return null;

  // Actualizar la instancia (validaciones y tipos se manejan por Sequelize)
  await contrato.update(data);

  // Devolver el contrato actualizado con sus relaciones (sin timestamps)
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

module.exports = putContractService;
