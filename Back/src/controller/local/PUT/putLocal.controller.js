const putLocalService = require("../../../services/local/PUT/putLocal.service");

const putLocalController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updated = await putLocalService(id, data);

        if (!updated) {
            return res.status(404).json({ message: "Local no encontrado" });
        }

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = putLocalController;
