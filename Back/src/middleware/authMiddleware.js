const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/config");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token no encontrado" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.adminId = decoded.id; // Agregar adminId al request
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

module.exports = authMiddleware;
