const { Router } = require("express");
const { Inquilino, Contrato, Local } = require("../models/index.model");

const tenantRouter = Router();

// Ruta PÚBLICA para que inquilinos busquen su información por DNI
tenantRouter.get("/inquilino/dni/:dni", async (req, res) => {
  try {
    const { dni } = req.params;

    // Buscar inquilino por DNI
    const inquilino = await Inquilino.findOne({
      where: { dni },
      include: [
        {
          model: Contrato,
          where: { estado: "activo" },
          required: false,
          include: [
            {
              model: Local,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "adminId"] },
    });

    if (!inquilino) {
      return res.status(404).json({ message: "Inquilino no encontrado" });
    }

    res.json(inquilino);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = tenantRouter;
