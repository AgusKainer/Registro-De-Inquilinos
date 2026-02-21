const { DataTypes } = require("sequelize");
const db = require("../../db/conectionDB");

const Contrato = db.define("Contrato", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
    type: DataTypes.STRING,
    allowNull: true,
  },
  estado: {
    type: DataTypes.ENUM("activo", "vencido", "rescindido"),
    defaultValue: "activo",
  },
  inquilinoId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  localId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  // Multi-tenant: cada contrato pertenece a un admin/cliente
  adminId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Contrato;
