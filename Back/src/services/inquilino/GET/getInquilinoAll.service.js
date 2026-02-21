const { Inquilino } = require("../../../models/index.model");

const getInquilinoAllService = async (adminId) => {
  const inquilinos = await Inquilino.findAll({
    where: { adminId },
  });
  return inquilinos;
};

module.exports = getInquilinoAllService;
