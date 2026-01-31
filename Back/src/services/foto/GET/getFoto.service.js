const { Foto } = require("../../../models/index.model");

const getFotoService = async () => {
    const fotos = await Foto.findAll();
    return fotos;
};

module.exports = getFotoService;
