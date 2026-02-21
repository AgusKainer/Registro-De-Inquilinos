const { DataTypes } = require("sequelize");
const db = require("../../db/conectionDB");

const Local = db.define("Local", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tipo: {
    type: DataTypes.ENUM("depto", "local_comercial", "vivienda"),
    allowNull: false,
    defaultValue: "vivienda",
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  n_departamento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Multi-tenant: cada local pertenece a un admin/cliente
  adminId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Local;
