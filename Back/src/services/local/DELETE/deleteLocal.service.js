const { Local, Contrato } = require("../../../models/index.model");

const deleteLocalService = async (id, adminId) => {
  // Verificar si el local tiene contratos asociados
  const contratosAsociados = await Contrato.count({
    where: { localId: id, adminId },
  });

  if (contratosAsociados > 0) {
    throw new Error(
      "No se puede eliminar este local porque tiene contratos asociados. Debe eliminar o reasignar los contratos primero.",
    );
  }

  const deleted = await Local.destroy({ where: { id, adminId } });
  return deleted;
};

module.exports = deleteLocalService;
