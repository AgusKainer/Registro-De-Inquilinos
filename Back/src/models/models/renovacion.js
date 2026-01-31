const { DataTypes } = require("sequelize");
const db = require("../../db/conectionDB");
const Renovacion = db.define("Renovacion", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  nuevoValor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pdf: {
    type: DataTypes.STRING, // ruta al PDF
    allowNull: true,
  },
});

module.exports = Renovacion;
