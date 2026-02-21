const { Inquilino, Contrato } = require("../../../models/index.model");

const deleteInquilinoService = async (id, adminId) => {
  // Verificar si el inquilino tiene contratos asociados
  const contratosAsociados = await Contrato.count({
    where: { inquilinoId: id },
  });

  if (contratosAsociados > 0) {
    throw new Error(
      "No se puede eliminar este inquilino porque tiene contratos asociados. Debe eliminar o reasignar los contratos primero.",
    );
  }

  const deleted = await Inquilino.destroy({ where: { id, adminId } });
  return deleted;
};

module.exports = deleteInquilinoService;
