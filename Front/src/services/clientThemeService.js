/**
 * Servicio para aplicar configuración de cliente
 *
 * Inyecta los colores del cliente en las variables CSS
 * Esto se ejecuta una sola vez al inicializar la app
 */

import CLIENT_CONFIG from "../config/clientConfig";

/**
 * Aplica la configuración de tema del cliente a las variables CSS
 * @param {string} theme - 'light' o 'dark'
 */
export const applyClientTheme = (theme = "light") => {
  const themeConfig = CLIENT_CONFIG.theme[theme];

  if (!themeConfig) {
    console.error(`Tema '${theme}' no encontrado en CLIENT_CONFIG`);
    return;
  }

  const root = document.documentElement;

  // Inyectar colores en variables CSS
  Object.entries(themeConfig).forEach(([key, value]) => {
    // Mapear nombres de config a variables CSS
    const cssVarName = `--client-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
    root.style.setProperty(cssVarName, value);
  });
};

/**
 * Obtiene la configuración del cliente
 */
export const getClientConfig = () => {
  return CLIENT_CONFIG;
};

/**
 * Obtiene un color específico del cliente
 * @param {string} colorName - Nombre del color (primaryColor, secondaryColor, etc.)
 * @param {string} theme - 'light' o 'dark'
 */
export const getClientColor = (colorName, theme = "light") => {
  return CLIENT_CONFIG.theme[theme]?.[colorName] || null;
};

/**
 * Verifica si el cliente permite personalización
 */
export const canCustomizeTheme = () => {
  return CLIENT_CONFIG.features.allowCustomization === true;
};

export default {
  applyClientTheme,
  getClientConfig,
  getClientColor,
  canCustomizeTheme,
};
