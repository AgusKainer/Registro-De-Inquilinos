const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const HOST = process.env.HOST;
module.exports = {
  PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,
  HOST,
  SECRET_KEY: process.env.SECRET_KEY || "mi_secreto_super_seguro",
};
