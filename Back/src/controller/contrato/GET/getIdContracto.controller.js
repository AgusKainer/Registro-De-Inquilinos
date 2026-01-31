const getContratoByIdService = require("../../../services/contrato/GET/getIdContract.service");

const getContratoByIdController = async (req, res) => {
  try {
    const contrato = await getContratoByIdService(req.params.id);

    if (!contrato) {
      return res.status(404).json({ message: "Contrato no encontrado" });
    }

    res.json(contrato);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getContratoByIdController;
