const { Admin } = require("../../../models/index.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../../utils/config");

const loginService = async (username, password) => {
    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
        throw new Error("Admin no encontrado");
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
        throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign({ id: admin.id }, SECRET_KEY, { expiresIn: "1h" });

    return { token, admin: { id: admin.id, username: admin.username } };
};

module.exports = loginService;
