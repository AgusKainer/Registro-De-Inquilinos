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
  // Multi-tenant: cada inquilino pertenece a un admin/cliente
  adminId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Inquilinos;
