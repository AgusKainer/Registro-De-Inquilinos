const deleteFotoService = require("../../../services/foto/DELETE/deleteFoto.service");

const deleteFotoController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteFotoService(id);

        if (!deleted) {
            return res.status(404).json({ message: "Foto no encontrada" });
        }

        res.json({ message: "Foto eliminada" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = deleteFotoController;
