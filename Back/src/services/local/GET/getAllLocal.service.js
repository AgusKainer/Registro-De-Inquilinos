const { Local } = require("../../../models/index.model");

const getAllLocalService = async () => {
    const { Foto } = require("../../../models/index.model");
    const locales = await Local.findAll({
        include: [{ model: Foto }]
    });
    return locales;
};

module.exports = getAllLocalService;
