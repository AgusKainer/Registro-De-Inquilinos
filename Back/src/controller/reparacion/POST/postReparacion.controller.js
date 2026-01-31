const postReparacionService = require("../../../services/reparacion/POST/postReparacion.service");

const postReparacionController = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.comprobante = `uploads/${req.file.filename}`;
    }

    const reparacion = await postReparacionService(data);
    res.status(201).json(reparacion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postReparacionController;
