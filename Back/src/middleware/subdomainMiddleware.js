// Middleware para detectar y validar el subdominio del cliente
// Permite usar URLs como: cliente.tuapp.com, admin.tuapp.com, etc.

const subdomainMiddleware = (req, res, next) => {
  const hostname = req.get("host");
  const parts = hostname.split(".");

  // Soporta formatos como: cliente.app.com, localhost
  let subdomain = null;

  if (parts.length > 2) {
    // cliente.app.com -> subdomain = "cliente"
    subdomain = parts[0];
  } else if (hostname.includes("localhost")) {
    // localhost:3000 -> undefined (modo desarrollo)
    subdomain = null;
  }

  req.subdomain = subdomain;
  next();
};

module.exports = subdomainMiddleware;
