const deleteLocalService = require("../../../services/local/DELETE/deleteLocal.service");

const deleteLocalController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteLocalService(id);

        if (!deleted) {
            return res.status(404).json({ message: "Local no encontrado" });
        }

        res.json({ message: "Local eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = deleteLocalController;
