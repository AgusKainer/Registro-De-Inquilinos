const renovarContratoService = require("../../../services/contrato/POST/renovacion.service");

const renovarContratoController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (req.file) {
      data.clausulas = `uploads/${req.file.filename}`;
    }

    const contrato = await renovarContratoService(id, data);

    res.json({
      message: "Contrato renovado correctamente",
      contrato,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = renovarContratoController;
