const deleteContractService = require("../../../services/contrato/DELETE/deleteContract.service");

const deleteContratoController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteContractService(id, req.adminId);

    if (!deleted) {
      return res.status(404).json({ message: "Contrato no encontrado" });
    }

    res.json({ message: "Contrato eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = deleteContratoController;
