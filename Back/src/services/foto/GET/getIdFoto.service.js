const { Foto } = require("../../../models/index.model");

const getIdFotoService = async (id) => {
    const foto = await Foto.findByPk(id);
    return foto;
};

module.exports = getIdFotoService;
