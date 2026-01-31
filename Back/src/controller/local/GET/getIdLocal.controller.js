const getIdLocalService = require("../../../services/local/GET/getIdLocal.service");

const getIdLocalController = async (req, res) => {
    try {
        const { id } = req.params;
        const local = await getIdLocalService(id);

        if (!local) {
            return res.status(404).json({ message: "Local no encontrado" });
        }

        res.json(local);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = getIdLocalController;
