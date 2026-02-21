// Middleware para validar que el subdominio coincida con el usuario actual
const { Admin } = require("../models/index.model");

const validateSubdomainMiddleware = async (req, res, next) => {
  try {
    // El middleware de autenticación debe ejecutarse primero para obtener adminId
    if (!req.adminId) {
      return next(); // Sin admin ID, continuar sin validar subdominio
    }

    // Obtener el admin actual
    const admin = await Admin.findByPk(req.adminId);

    if (!admin) {
      return res.status(401).json({ message: "Admin no encontrado" });
    }

    // Si el cliente tiene subdominio configurado, validar que coincida
    if (
      admin.subdominio &&
      req.subdomain &&
      admin.subdominio !== req.subdomain
    ) {
      return res.status(403).json({
        message: "Acceso denegado: Subdominio no coincide con tu cuenta",
      });
    }

    // Almacenar el admin en el request para uso posterior
    req.admin = admin;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = validateSubdomainMiddleware;
