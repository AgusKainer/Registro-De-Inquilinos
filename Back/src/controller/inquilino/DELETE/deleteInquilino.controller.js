const deleteInquilinoService = require("../../../services/inquilino/DELETE/deleteInquilino.service");

const deleteInquilinoController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteInquilinoService(id, req.adminId);

    if (!deleted) {
      return res.status(404).json({ message: "Inquilino no encontrado" });
    }

    res.json({ message: "Inquilino eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = deleteInquilinoController;
