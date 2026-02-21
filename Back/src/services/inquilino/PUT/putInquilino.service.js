const { Inquilino } = require("../../../models/index.model");

const putInquilinoService = async (id, data, adminId) => {
  const [updated] = await Inquilino.update(data, { where: { id, adminId } });
  if (updated) {
    const updatedInquilino = await Inquilino.findOne({
      where: { id, adminId },
    });
    return updatedInquilino;
  }
  return null;
};

module.exports = putInquilinoService;
