const { Inquilino } = require("../../../models/index.model");

const postInquilinoService = async (data) => {
  console.log("que recibe el service: ", data);

  const newInquilino = await Inquilino.create(data);
  return newInquilino;
};

module.exports = postInquilinoService;
