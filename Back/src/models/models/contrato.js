const { DataTypes } = require("sequelize");
const db = require("../../db/conectionDB");

const Contrato = db.define("Contrato", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fechaDeIngreso: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaVigente: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaDeAumento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  valor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clausulas: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Contrato;
