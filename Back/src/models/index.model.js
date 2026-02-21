const Contrato = require("./models/contrato");
const Foto = require("./models/fotos");
const Inquilino = require("./models/inquilino");
const Local = require("./models/local");
const Admin = require("./models/admin");
const Reparacion = require("./models/reparacion");
const Renovacion = require("./models/renovacion");

// ===== Relaciones de Admin (Multi-Tenant) =====
Admin.hasMany(Inquilino, { foreignKey: "adminId", onDelete: "CASCADE" });
Inquilino.belongsTo(Admin, { foreignKey: "adminId" });

Admin.hasMany(Local, { foreignKey: "adminId", onDelete: "CASCADE" });
Local.belongsTo(Admin, { foreignKey: "adminId" });

Admin.hasMany(Contrato, { foreignKey: "adminId", onDelete: "CASCADE" });
Contrato.belongsTo(Admin, { foreignKey: "adminId" });

Admin.hasMany(Foto, { foreignKey: "adminId", onDelete: "CASCADE" });
Foto.belongsTo(Admin, { foreignKey: "adminId" });

Admin.hasMany(Reparacion, { foreignKey: "adminId", onDelete: "CASCADE" });
Reparacion.belongsTo(Admin, { foreignKey: "adminId" });

Admin.hasMany(Renovacion, { foreignKey: "adminId", onDelete: "CASCADE" });
Renovacion.belongsTo(Admin, { foreignKey: "adminId" });

// ===== Relaciones Originales =====
Contrato.belongsTo(Inquilino, {
  foreignKey: "inquilinoId",
  allowNull: false,
});
Inquilino.hasMany(Contrato, {
  foreignKey: "inquilinoId",
});

Contrato.belongsTo(Local, {
  foreignKey: "localId",
  allowNull: false,
});
Local.hasMany(Contrato, {
  foreignKey: "localId",
});

Local.hasMany(Foto, { foreignKey: "localId" });
Foto.belongsTo(Local, { foreignKey: "localId" });

Contrato.hasMany(Reparacion, { foreignKey: "contratoId" });
Reparacion.belongsTo(Contrato, { foreignKey: "contratoId" });

Contrato.hasMany(Renovacion, { foreignKey: "contratoId" });
Renovacion.belongsTo(Contrato, { foreignKey: "contratoId" });

module.exports = {
  Contrato,
  Foto,
  Inquilino,
  Local,
  Admin,
  Renovacion,
  Reparacion,
};
