const postLocalService = require("../../../services/local/POST/postLocal.service");

const postLocalController = async (req, res) => {
    try {
        const data = req.body;
        const newLocal = await postLocalService(data);

        // If files are uploaded, create Foto entries
        if (req.files && req.files.length > 0) {
            const { Foto } = require("../../../models/index.model");

            const fotoPromises = req.files.map(file => {
                return Foto.create({
                    url: `uploads/${file.filename}`,
                    descripcion: "Foto del local",
                    local_id: newLocal.id
                });
            });

            await Promise.all(fotoPromises);
        }

        res.status(201).json(newLocal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = postLocalController;
