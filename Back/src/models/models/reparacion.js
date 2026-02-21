const { DataTypes } = require("sequelize");
const db = require("../../db/conectionDB");

const Reparacion = db.define("Reparacion", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  costo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  estado: {
    type: DataTypes.ENUM("pendiente", "en_proceso", "finalizada"),
    defaultValue: "pendiente",
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  responsable: {
    type: DataTypes.ENUM("DUENO", "INQUILINO"),
    allowNull: false,
  },
  contratoId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  // Multi-tenant: cada reparación pertenece a un admin/cliente
  adminId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Reparacion;
