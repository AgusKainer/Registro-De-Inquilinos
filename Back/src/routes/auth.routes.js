const { Router } = require("express");
const { register, login } = require("../controller/auth/auth.controller");
const updateAdminProfile = require("../controller/auth/auth.profile.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.post("/register", register);
router.post("/login", login);

// Ruta protegida para actualizar perfil del admin
router.put("/profile", authMiddleware, updateAdminProfile);

module.exports = router;
