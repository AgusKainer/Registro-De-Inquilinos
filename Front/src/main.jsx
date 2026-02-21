import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext";
import { applyClientTheme } from "./services/clientThemeService";
import App from "./App";
import "./index.css";

// Aplicar configuración de cliente (colores personalizados) al inicializar
applyClientTheme("light");

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
