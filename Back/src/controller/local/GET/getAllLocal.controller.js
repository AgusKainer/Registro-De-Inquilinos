const getAllLocalService = require("../../../services/local/GET/getAllLocal.service");

const getAllLocalController = async (req, res) => {
  try {
    const locales = await getAllLocalService(req.adminId);
    res.json(locales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getAllLocalController;
