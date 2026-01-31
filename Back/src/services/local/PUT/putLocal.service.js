const { Local } = require("../../../models/index.model");

const putLocalService = async (id, data) => {
    const [updated] = await Local.update(data, { where: { id } });
    if (updated) {
        return await Local.findByPk(id);
    }
    return null;
};

module.exports = putLocalService;
