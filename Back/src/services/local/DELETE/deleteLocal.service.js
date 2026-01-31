const { Local } = require("../../../models/index.model");

const deleteLocalService = async (id) => {
    const deleted = await Local.destroy({ where: { id } });
    return deleted;
};

module.exports = deleteLocalService;
