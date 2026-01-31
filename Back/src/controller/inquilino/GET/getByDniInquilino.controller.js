const getByDniService = require("../../../services/inquilino/GET/getByDni.service");

const getByDni = async (req, res) => {
    const { dni } = req.params;
    try {
        const inquilino = await getByDniService(dni);

        if (!inquilino) {
            return res.status(404).json({ message: "Inquilino no encontrado" });
        }

        res.json(inquilino);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = getByDni;
