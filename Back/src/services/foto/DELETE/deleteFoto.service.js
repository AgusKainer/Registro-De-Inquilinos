const { Foto } = require("../../../models/index.model");

const deleteFotoService = async (id) => {
    const deleted = await Foto.destroy({ where: { id } });
    return deleted;
};

module.exports = deleteFotoService;
