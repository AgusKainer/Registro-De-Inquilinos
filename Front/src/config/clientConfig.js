/**
 * Configuración de Cliente Independiente
 *
 * IMPORTANTE: Esta es la configuración de la APLICACIÓN entregada a este cliente.
 * Cada cliente recibe su propia versión de la app con sus colores personalizados.
 *
 * Los cambios aquí NO afectan a otros clientes.
 * Este archivo se personaliza una única vez al entregar la app al cliente.
 */

const CLIENT_CONFIG = {
  // Identidad del cliente
  clientName: "Cliente Demo",

  // Colores principales de la aplicación
  theme: {
    light: {
      primaryColor: "#3b82f6", // Azul (primario)
      secondaryColor: "#10b981", // Verde (secundario)
      accentColor: "#f59e0b", // Naranja (acento)
      backgroundColor: "#ffffff", // Fondo
      textColor: "#1f2937", // Texto
    },
    dark: {
      primaryColor: "#60a5fa", // Azul claro (primario)
      secondaryColor: "#34d399", // Verde claro (secundario)
      accentColor: "#fbbf24", // Naranja claro (acento)
      backgroundColor: "#0f172a", // Fondo oscuro
      textColor: "#f1f5f9", // Texto claro
    },
  },

  // Información adicional del cliente
  brandName: "InquiliCheck",
  logoUrl: null, // Opcional: URL del logo personalizado

  // Configuración de la aplicación
  features: {
    allowThemeToggle: true, // Permite cambiar entre light/dark
    allowCustomization: false, // NO permite cambiar colores desde la app
  },
};

export default CLIENT_CONFIG;
