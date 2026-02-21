const { Inquilino, Contrato } = require("../../../models/index.model");

const getByDniService = async (dni, adminId) => {
  const { Local, Foto } = require("../../../models/index.model");
  const inquilino = await Inquilino.findOne({
    where: { dni, adminId },
    include: [
      {
        model: Contrato,
        include: [
          {
            model: Local,
            include: [{ model: Foto }],
          },
        ],
      },
    ],
  });
  return inquilino;
};

module.exports = getByDniService;
