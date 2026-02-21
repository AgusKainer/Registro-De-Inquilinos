const postFotoService = require("../../../services/foto/POST/postFoto.service");

const postFotoController = async (req, res) => {
  try {
    const data = req.body;
    data.adminId = req.adminId;
    const newFoto = await postFotoService(data);
    res.status(201).json(newFoto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = postFotoController;
