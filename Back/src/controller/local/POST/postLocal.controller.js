const postLocalService = require("../../../services/local/POST/postLocal.service");

const postLocalController = async (req, res) => {
  try {
    const data = req.body;
    data.adminId = req.adminId;
    const newLocal = await postLocalService(data);

    // If files are uploaded, create Foto entries
    if (req.files && req.files.length > 0) {
      const { Foto } = require("../../../models/index.model");

      const fotoPromises = req.files.map((file) => {
        return Foto.create({
          url: `uploads/${file.filename}`,
          descripcion: "Foto del local",
          localId: newLocal.id,
          adminId: req.adminId,
        });
      });

      await Promise.all(fotoPromises);
    }

    // Fetch local with photos to return to frontend
    const { Local, Foto } = require("../../../models/index.model");
    const finalLocal = await Local.findByPk(newLocal.id, {
      include: [{ model: Foto }],
    });

    res.status(201).json(finalLocal);
    console.log("que llega al controller: ", finalLocal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = postLocalController;
