const { DataTypes } = require("sequelize");
const db = require("../../db/conectionDB");

const Inquilinos = db.define("Inquilino", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  dni: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Inquilinos;
