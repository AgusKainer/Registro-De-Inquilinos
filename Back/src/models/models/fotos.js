const { DataTypes } = require("sequelize");
const db = require("../../db/conectionDB");

const Fotos = db.define("Fotos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  local_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Fotos;
