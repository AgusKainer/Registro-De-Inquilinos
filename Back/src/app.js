const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const subdomainMiddleware = require("./middleware/subdomainMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const validateSubdomainMiddleware = require("./middleware/validateSubdomainMiddleware");
const router = require("./routes/index.routes");
const reparacionRoutes = require("./routes/reparacion/reparacion.routes");
const tenantRoutes = require("./routes/tenant.routes");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Middleware de subdominio global
app.use(subdomainMiddleware);

// Las rutas de autenticación no necesitan middleware de autenticación
const authRoutes = require("./routes/auth.routes");
app.use("/alquileres/auth", authRoutes);

// Rutas públicas para inquilinos (sin autenticación)
app.use("/tenant", tenantRoutes);

// Aplicar middleware de autenticación a todas las demás rutas
app.use("/alquileres", authMiddleware, validateSubdomainMiddleware, router);
app.use(
  "/reparaciones",
  authMiddleware,
  validateSubdomainMiddleware,
  reparacionRoutes,
);

const path = require("path");

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

module.exports = app;
