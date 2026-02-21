const { Local } = require("../../../models/index.model");

const getAllLocalService = async (adminId) => {
  const { Foto } = require("../../../models/index.model");
  const locales = await Local.findAll({
    where: { adminId },
    include: [{ model: Foto }],
  });
  return locales;
};

module.exports = getAllLocalService;
