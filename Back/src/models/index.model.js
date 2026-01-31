const Contrato = require("./models/contrato");
const Foto = require("./models/fotos");
const Inquilino = require("./models/inquilino");
const Local = require("./models/local");
const Admin = require("./models/admin");
const Reparacion = require("./models/reparacion");
const Renovacion = require("./models/renovacion");

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
