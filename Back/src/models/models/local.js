const { DataTypes } = require("sequelize");
const db = require("../../db/conectionDB");

const Local = db.define("Local", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fechaDeIngreso: {
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
  Clausulas: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Local;
