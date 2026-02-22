// Determinar automáticamente la URL base de la API
export const fetchAutomatic = () => {
  const env = import.meta.env.VITE_API_BASE || "http://localhost:30/alquileres";
  return env;
};
