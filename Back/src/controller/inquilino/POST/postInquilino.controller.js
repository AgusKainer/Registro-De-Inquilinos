const postInquilinoService = require("../../../services/inquilino/POST/postInquilino.service");

const postInquilinoController = async (req, res) => {
  try {
    const data = req.body;
    data.adminId = req.adminId;
    console.log("que recibo desde el front: ", req.body);

    const newInquilino = await postInquilinoService(data);
    res.status(201).json(newInquilino);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = postInquilinoController;
