const { Local } = require("../../../models/index.model");

const getIdLocalService = async (id) => {
    const local = await Local.findByPk(id);
    return local;
};

module.exports = getIdLocalService;
