import { useEffect, useState } from "react";
import { getLocales, createLocal } from "../services/api";

const Locales = () => {
  const [locales, setLocales] = useState([]);
  const [form, setForm] = useState({
    observaciones: "",
    tipo: "vivienda",
    fotos: null,
    direccion: "", // Nuevo campo
    n_departamento: null, // Nuevo campo
  });

  useEffect(() => {
    fetchLocales();
  }, []);

  const fetchLocales = async () => {
    try {
      const data = await getLocales();
      setLocales(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "fotos") {
      setForm({ ...form, fotos: files });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("observaciones", form.observaciones);
      formData.append("tipo", form.tipo);
      formData.append("direccion", form.direccion); // Nuevo campo
      formData.append("n_departamento", form.n_departamento); // Nuevo campo

      if (form.fotos) {
        for (let i = 0; i < form.fotos.length; i++) {
          formData.append("fotos", form.fotos[i]);
        }
      }

      const newLocal = await createLocal(formData);
      setLocales([...locales, newLocal]);
      setForm({
        observaciones: "",
        tipo: "vivienda",
        fotos: null,
        direccion: "", // Reiniciar el campo
        n_departamento: null, // Reiniciar el campo
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ animation: "fadeIn 0.5s ease-out" }}>
      <div className="card" style={{ marginBottom: "2.5rem" }}>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            marginBottom: "1.5rem",
          }}
        >
          Añadir Nueva Propiedad
        </h3>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
          }}
        >
          <div className="form-group">
            <label>Tipo de Inmueble</label>
            <select name="tipo" value={form.tipo} onChange={handleChange}>
              <option value="vivienda">🏘️ Vivienda / Casa</option>
              <option value="depto">🏢 Departamento</option>
              <option value="local_comercial">🛍️ Local Comercial</option>
            </select>
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input
              type="text"
              name="direccion"
              placeholder="Ingrese la dirección del inmueble..."
              value={form.direccion}
              onChange={handleChange}
              style={{ padding: "0.5rem" }}
            />
          </div>
          <div className="form-group">
            <label>Número de Departamento</label>
            <input
              type="number"
              name="n_departamento"
              placeholder="Ingrese el número de departamento..."
              value={form.n_departamento}
              onChange={handleChange}
              style={{ padding: "0.5rem" }}
            />
          </div>
          <div className="form-group">
            <label>Cargar Fotos</label>
            <input
              type="file"
              name="fotos"
              multiple
              accept="image/*"
              onChange={handleChange}
              style={{ padding: "0.5rem" }}
            />
          </div>
          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <label>Observaciones y Detalles</label>
            <textarea
              name="observaciones"
              placeholder="Describa el estado, reparaciones pendientes o características únicas..."
              value={form.observaciones}
              onChange={handleChange}
              style={{ minHeight: "100px", resize: "none" }}
            />
          </div>
          <button
            type="submit"
            style={{ gridColumn: "span 2", padding: "1rem" }}
          >
            Registrar Propiedad
          </button>
        </form>
      </div>

      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          marginBottom: "1.5rem",
        }}
      >
        Propiedades Registradas
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {locales.map((local) => (
          <div
            key={local.id}
            className="card"
            style={{
              padding: 0,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                position: "relative",
                height: "180px",
                background: "var(--border-color)",
              }}
            >
              {local.Fotos && local.Fotos.length > 0 ? (
                <img
                  src={`http://localhost:30/${local.Fotos[0].url}`}
                  alt="local"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-secondary)",
                  }}
                >
                  Sin fotos
                </div>
              )}
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  background: "var(--accent-gradient)",
                  color: "white",
                  padding: "0.3rem 0.7rem",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                }}
              >
                {local.tipo?.toUpperCase()}
              </div>
            </div>

            <div style={{ padding: "1.5rem" }}>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text-primary)",
                  minHeight: "3em",
                  marginBottom: "1.5rem",
                }}
              >
                {local.observaciones || "Sin observaciones adicionales."}
              </p>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  className="secondary"
                  style={{ flex: 1, padding: "0.6rem", fontSize: "0.85rem" }}
                >
                  Gestionar
                </button>
                {local.Fotos && local.Fotos.length > 1 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0 0.5rem",
                      color: "var(--text-secondary)",
                      fontSize: "0.8rem",
                    }}
                  >
                    +{local.Fotos.length - 1} fotos
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {locales.length === 0 && (
        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "4rem",
            color: "var(--text-secondary)",
          }}
        >
          No hay propiedades registradas actualmente.
        </div>
      )}
    </div>
  );
};

export default Locales;
