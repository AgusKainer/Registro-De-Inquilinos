const { Inquilino } = require("../../../models/index.model");

const getInquilinoAllService = async () => {
    const inquilinos = await Inquilino.findAll();
    return inquilinos;
};

module.exports = getInquilinoAllService;
