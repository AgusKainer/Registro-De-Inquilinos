const updateAdminProfileService = require("../../services/auth/PUT/updateAdminProfile.service");

const updateAdminProfile = async (req, res) => {
  try {
    const { nombreEmpresa, email, telefono, dominio, subdominio } = req.body;

    const updatedAdmin = await updateAdminProfileService(req.adminId, {
      nombreEmpresa,
      email,
      telefono,
      dominio,
      subdominio,
    });

    res.json({
      message: "Perfil actualizado correctamente",
      admin: {
        id: updatedAdmin.id,
        username: updatedAdmin.username,
        nombreEmpresa: updatedAdmin.nombreEmpresa,
        email: updatedAdmin.email,
        telefono: updatedAdmin.telefono,
        dominio: updatedAdmin.dominio,
        subdominio: updatedAdmin.subdominio,
      },
    });
  } catch (error) {
    const status = error.message.includes("ya está registrado") ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

module.exports = updateAdminProfile;
