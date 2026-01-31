const app = require("./app");
const db = require("./db/conectionDB");
const { PORT } = require("./utils/config");

const server = async () => {
  try {
    await db.sync();
    console.log("Base de datos conectada");

    app.listen(PORT);
    console.log("Servidor levantado , en el puerto: ", PORT);
  } catch (error) {
    console.log(`ERROR AL LEVANTAR EL SERVIDOR: ${error}`);
  }
};

server();
//{ force: true }
