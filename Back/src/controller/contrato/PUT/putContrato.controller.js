const putContractService = require("../../../services/contrato/PUT/putContract.service");

const putContratoController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updated = await putContractService(id, data);

        if (!updated) {
            return res.status(404).json({ message: "Contrato no encontrado" });
        }

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = putContratoController;
