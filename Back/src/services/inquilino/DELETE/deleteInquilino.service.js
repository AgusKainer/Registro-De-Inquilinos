const { Inquilino } = require("../../../models/index.model");

const deleteInquilinoService = async (id) => {
    const deleted = await Inquilino.destroy({ where: { id } });
    return deleted;
};

module.exports = deleteInquilinoService;
