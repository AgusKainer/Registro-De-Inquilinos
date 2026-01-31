const { Foto } = require("../../../models/index.model");

const postFotoService = async (data) => {
    const newFoto = await Foto.create(data);
    return newFoto;
};

module.exports = postFotoService;
