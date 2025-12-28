const app = require("./app");

const server = async () => {
  try {
    app.listen(30);
    console.log("Servidor levantado , en el puerto: ", 30);
  } catch (error) {
    console.log(`ERROR AL LEVANTAR EL SERVIDOR: ${error}`);
  }
};

server();
