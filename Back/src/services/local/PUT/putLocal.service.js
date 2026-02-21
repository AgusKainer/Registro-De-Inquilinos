const { Local, Foto } = require("../../../models/index.model");

const putLocalService = async (id, data, adminId) => {
  await Local.update(data, { where: { id, adminId } });
  const local = await Local.findByPk(id, {
    where: { id, adminId },
    include: [{ model: Foto }],
  });
  return local;
};

module.exports = putLocalService;
