const { Contrato, Renovacion } = require("../../../models/index.model");
const db = require("../../../db/conectionDB");

const renovarContratoService = async (contratoId, data) => {
  return await db.transaction(async (t) => {
    const contrato = await Contrato.findByPk(contratoId, { transaction: t });

    if (!contrato) {
      throw new Error("Contrato no encontrado");
    }

    await Renovacion.create(
      {
        contratoId,
        fechaInicio: data.fechaDeIngreso,
        fechaVigente: data.fechaVigente,
        fechaAumento: data.fechaDeAumento,
        valor: data.valor,
        pdf: data.clausulas || null,
      },
      { transaction: t },
    );

    await contrato.update(
      {
        fechaDeIngreso: data.fechaDeIngreso,
        fechaVigente: data.fechaVigente,
        fechaDeAumento: data.fechaDeAumento,
        valor: data.valor,
        clausulas: data.clausulas || contrato.clausulas,
        estado: "activo",
      },
      { transaction: t },
    );

    return contrato;
  });
};

module.exports = renovarContratoService;
