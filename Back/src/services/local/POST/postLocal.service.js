const { Local } = require("../../../models/index.model");

const postLocalService = async (data) => {
    const newLocal = await Local.create(data);
    return newLocal;
};

module.exports = postLocalService;
