const { Inquilino } = require("../../../models/index.model");

const putInquilinoService = async (id, data) => {
    const [updated] = await Inquilino.update(data, { where: { id } });
    if (updated) {
        const updatedInquilino = await Inquilino.findOne({ where: { id } });
        return updatedInquilino;
    }
    return null;
};

module.exports = putInquilinoService;
