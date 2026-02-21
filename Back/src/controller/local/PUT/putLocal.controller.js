const putLocalService = require("../../../services/local/PUT/putLocal.service");

const putLocalController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await putLocalService(id, data, req.adminId);

    if (!updated) {
      return res.status(404).json({ message: "Local no encontrado" });
    }

    // If files are uploaded, create Foto entries
    if (req.files && req.files.length > 0) {
      const { Foto } = require("../../../models/index.model");

      const fotoPromises = req.files.map((file) => {
        return Foto.create({
          url: `uploads/${file.filename}`,
          descripcion: "Foto adicional del local",
          localId: id,
          adminId: req.adminId,
        });
      });

      await Promise.all(fotoPromises);
    }

    // Fetch updated local with all photos
    const { Local, Foto } = require("../../../models/index.model");
    const finalLocal = await Local.findByPk(id, { include: [{ model: Foto }] });

    res.json(finalLocal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = putLocalController;
