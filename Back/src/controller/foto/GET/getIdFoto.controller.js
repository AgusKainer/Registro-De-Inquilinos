const getIdFotoService = require("../../../services/foto/GET/getIdFoto.service");

const getIdFotoController = async (req, res) => {
  try {
    const { id } = req.params;
    const foto = await getIdFotoService(id, req.adminId);

    if (!foto) {
      return res.status(404).json({ message: "Foto no encontrada" });
    }

    res.json(foto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getIdFotoController;
