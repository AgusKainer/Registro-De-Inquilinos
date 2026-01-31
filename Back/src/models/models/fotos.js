const { DataTypes } = require("sequelize");
const db = require("../../db/conectionDB");

const Fotos = db.define("Fotos", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: DataTypes.TEXT,
  localId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Fotos;
