const { Contrato } = require("../../../models/index.model");

const putContractService = async (id, data) => {
    const [updated] = await Contrato.update(data, { where: { id } });
    if (updated) {
        return await Contrato.findByPk(id);
    }
    return null;
};

module.exports = putContractService;
