const { Contrato, Renovacion } = require("../../../models/index.model");
const db = require("../../../db/conectionDB");

const renovarContratoService = async (contratoId, data, adminId) => {
  return await db.transaction(async (t) => {
    // Usar findOne con where para garantizar adminId
    const contrato = await Contrato.findOne({
      where: { id: contratoId, adminId },
      transaction: t,
    });

    if (!contrato) {
      throw new Error("Contrato no encontrado");
    }

    const fechaInicio =
      data.fechaInicio || data.fechaDeIngreso || contrato.fechaDeIngreso;
    const fechaFin =
      data.fechaFin || data.fechaVigente || contrato.fechaVigente;
    const nuevoValor = data.nuevoValor
      ? parseInt(data.nuevoValor, 10)
      : contrato.valor;
    const pdf = data.clausulas || null;

    // Crear renovación incluyendo adminId para cumplir la restricción NOT NULL
    await Renovacion.create(
      {
        contratoId,
        fechaInicio,
        fechaFin,
        nuevoValor,
        pdf,
        adminId,
      },
      { transaction: t },
    );

    await contrato.update(
      {
        fechaDeIngreso: fechaInicio,
        fechaVigente: fechaFin,
        fechaDeAumento: data.fechaDeAumento || contrato.fechaDeAumento,
        valor: nuevoValor,
        clausulas: data.clausulas || contrato.clausulas,
        estado: "activo",
      },
      { transaction: t },
    );

    // Recargar el contrato actualizado
    await contrato.reload({ transaction: t });

    return contrato;
  });
};

module.exports = renovarContratoService;
