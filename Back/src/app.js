const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/index.routes");
const reparacionRoutes = require("./routes/reparacion/reparacion.routes");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/alquileres", router);
app.use("/reparaciones", reparacionRoutes);

// Serve uploaded files statically
app.use("/uploads", express.static("public/uploads"));

module.exports = app;
