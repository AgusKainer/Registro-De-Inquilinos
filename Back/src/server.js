const app = require("./app");
const db = require("./db/conectionDB");
const { PORT } = require("./utils/config");

const server = async () => {
  try {
    // IMPORTANTE: Cambiar 'force: true' a 'force: false' después de sincronizar
    // force: true recreará todas las tablas (solo usar para desarrollo/migración)
    // Si obtienes errores 500, usa force: true UNA VEZ para recrear las tablas
    await db.sync();
    console.log("Base de datos conectada");

    app.listen(PORT);
    console.log("Servidor levantado , en el puerto: ", PORT);
  } catch (error) {
    console.log(`ERROR AL LEVANTAR EL SERVIDOR: ${error}`);
  }
};

server();
