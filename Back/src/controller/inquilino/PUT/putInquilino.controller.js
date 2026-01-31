const putInquilinoService = require("../../../services/inquilino/PUT/putInquilino.service");

const putInquilinoController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedInquilino = await putInquilinoService(id, data);

        if (!updatedInquilino) {
            return res.status(404).json({ message: "Inquilino no encontrado" });
        }

        res.json(updatedInquilino);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = putInquilinoController;
