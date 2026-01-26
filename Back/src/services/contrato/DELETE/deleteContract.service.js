const { Contrato } = require("../../../models/index.model");
const getIdContractService = require("../GET/getIdContract.service");

const deleteContractService = async ({ id }) => {
  const contract = await getIdContractService({ id });
  if (!contract) {
    throw new Error("Contrato No existe");
  }
  await contract.destroy();
  return { message: "Contract eliminado correctamente", data: contract };
};

module.exports = deleteContractService;
