const registerService = require("../../services/auth/POST/register.service");
const loginService = require("../../services/auth/POST/login.service");

const register = async (req, res) => {
  try {
    const { username, password, nombreEmpresa } = req.body;
    const newAdmin = await registerService(username, password, nombreEmpresa);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await loginService(username, password);
    res.json(result);
  } catch (error) {
    const status =
      error.message === "Admin no encontrado" ||
      error.message === "Contraseña incorrecta"
        ? 401
        : 500;
    res.status(status).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
