// Servicio para actualizar el perfil del admin
const { Admin } = require("../../../models/index.model");

const updateAdminProfileService = async (adminId, data) => {
  // Campos permitidos para actualizar
  const allowedFields = [
    "nombreEmpresa",
    "email",
    "telefono",
    "dominio",
    "subdominio",
  ];
  const updateData = {};

  // Solo permitir actualizar campos específicos
  Object.keys(data).forEach((key) => {
    if (allowedFields.includes(key)) {
      updateData[key] = data[key];
    }
  });

  // Validar unicidad si se actualiza subdominio o dominio
  if (updateData.subdominio) {
    const existingSubdominio = await Admin.findOne({
      where: { subdominio: updateData.subdominio },
    });
    if (existingSubdominio && existingSubdominio.id !== adminId) {
      throw new Error("Este subdominio ya está registrado");
    }
  }

  if (updateData.dominio) {
    const existingDominio = await Admin.findOne({
      where: { dominio: updateData.dominio },
    });
    if (existingDominio && existingDominio.id !== adminId) {
      throw new Error("Este dominio ya está registrado");
    }
  }

  // Actualizar el admin
  await Admin.update(updateData, { where: { id: adminId } });

  // Retornar el admin actualizado
  const updatedAdmin = await Admin.findByPk(adminId);
  return updatedAdmin;
};

module.exports = updateAdminProfileService;
