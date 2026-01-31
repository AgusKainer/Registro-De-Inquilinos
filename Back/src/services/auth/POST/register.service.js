const { Admin } = require("../../../models/index.model");
const bcrypt = require("bcryptjs");

const registerService = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
        username,
        password: hashedPassword,
    });
    return newAdmin;
};

module.exports = registerService;
