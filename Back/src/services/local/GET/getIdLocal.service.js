const {
  Local,
  Foto,
  Contrato,
  Inquilino,
} = require("../../../models/index.model");

const getIdLocalService = async (id, adminId) => {
  const local = await Local.findByPk(id, {
    where: { id, adminId },
    include: [
      { model: Foto },
      {
        model: Contrato,
        include: [{ model: Inquilino }],
      },
    ],
  });
  return local;
};

module.exports = getIdLocalService;
