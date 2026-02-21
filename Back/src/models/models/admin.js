const { DataTypes } = require("sequelize");
const sequelize = require("../../db/conectionDB");

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Datos de la empresa/cliente
  nombreEmpresa: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Configuración de dominio
  dominio: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  subdominio: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
});

module.exports = Admin;
