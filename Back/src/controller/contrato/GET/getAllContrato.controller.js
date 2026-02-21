const getAllContractService = require("../../../services/contrato/GET/getAllContract.service");

const getAllContratoController = async (req, res) => {
  try {
    const contratos = await getAllContractService(req.adminId);
    res.json(contratos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getAllContratoController;
