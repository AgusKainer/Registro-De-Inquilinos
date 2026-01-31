const getInquilinoAllService = require("../../../services/inquilino/GET/getInquilinoAll.service");

const getAllInquilinoController = async (req, res) => {
    try {
        const inquilinos = await getInquilinoAllService();
        res.json(inquilinos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = getAllInquilinoController;
