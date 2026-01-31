const getFotoService = require("../../../services/foto/GET/getFoto.service");

const getAllFotoController = async (req, res) => {
    try {
        const fotos = await getFotoService();
        res.json(fotos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = getAllFotoController;
