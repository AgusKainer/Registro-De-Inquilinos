const { DataTypes } = require("sequelize");
const db = require("../../db/conectionDB");

const Inquilinos = db.define("Inquilino", {
  dni: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Inquilinos;
