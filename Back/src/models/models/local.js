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
    type: DataTypes.STRING, // mejor que INTEGER
    allowNull: true,
  },
});

module.exports = Local;
