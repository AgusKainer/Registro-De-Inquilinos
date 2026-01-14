const { Sequelize } = require("sequelize");
const { HOST, DB_NAME, DB_PASS, DB_USER } = require("../utils/config");

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: HOST,
  dialect: "postgres",
});

module.exports = db;
