const { Inquilino, Contrato } = require("../../../models/index.model");

const getByDniService = async (dni) => {
    const inquilino = await Inquilino.findOne({
        where: { dni },
        include: [
            {
                model: Contrato,
                through: { attributes: [] },
            },
        ],
    });
    return inquilino;
};

module.exports = getByDniService;
