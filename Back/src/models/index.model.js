const Contrato = require("./models/contrato");
const Foto = require("./models/fotos");
const Inquilino = require("./models/inquilino");
const Local = require("./models/local");

Contrato.belongsToMany(Local, {
  through: "ContratoLocales",
  foreignKey: "contratoId",
});
Local.belongsToMany(Contrato, {
  through: "ContratoLocales",
  foreignKey: "localId",
});

Contrato.belongsToMany(Inquilino, {
  through: "ContratoInquilinos",
  foreignKey: "contratoId",
});
Inquilino.belongsToMany(Contrato, {
  through: "ContratoInquilinos",
  foreignKey: "inquilinoId",
});

Local.hasMany(Foto, { foreignKey: "localId" });
Foto.belongsTo(Local, { foreignKey: "localId" });

module.exports = {
  Contrato,
  Foto,
  Inquilino,
  Local,
};
