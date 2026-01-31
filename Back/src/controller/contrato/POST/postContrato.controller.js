const postContractService = require("../../../services/contrato/POST/postContract.service");

const postContratoController = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.clausulas = `uploads/${req.file.filename}`;
    }

    const contrato = await postContractService(data);
    res.status(201).json(contrato);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = postContratoController;
