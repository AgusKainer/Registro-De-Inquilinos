import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  getContratos,
  createContrato,
  getInquilinos,
  getLocales,
  deleteContrato,
} from "../services/api";

const Contratos = () => {
  const navigate = useNavigate();

  const [contratos, setContratos] = useState([]);
  const [inquilinos, setInquilinos] = useState([]);
  const [locales, setLocales] = useState([]);

  const [form, setForm] = useState({
    fechaDeIngreso: "",
    fechaVigente: "",
    fechaDeAumento: "",
    valor: "",
    clausulas: null, // File
    inquilinoId: "",
    localId: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [cData, iData, lData] = await Promise.all([
        getContratos(),
        getInquilinos(),
        getLocales(),
      ]);
      setContratos(cData);
      setInquilinos(iData);
      setLocales(lData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "¿Está seguro de que desea eliminar este contrato? Esta acción no se puede deshacer.",
      )
    ) {
      try {
        await deleteContrato(id);
        fetchData();
      } catch (error) {
        alert("Error al eliminar el contrato");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "clausulas") {
      setForm({ ...form, clausulas: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fechaDeIngreso", form.fechaDeIngreso);
      formData.append("fechaVigente", form.fechaVigente);
      formData.append("fechaDeAumento", form.fechaDeAumento);
      formData.append("valor", form.valor);
      formData.append("inquilinoId", form.inquilinoId);
      formData.append("localId", form.localId);

      if (form.clausulas) {
        formData.append("clausulas", form.clausulas);
      }

      const newContrato = await createContrato(formData);
      setContratos([...contratos, newContrato]);

      setForm({
        fechaDeIngreso: "",
        fechaVigente: "",
        fechaDeAumento: "",
        valor: "",
        clausulas: null,
        inquilinoId: "",
        localId: "",
      });
      // Reset file input manually if needed using ref, but usually fine.
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Error al crear contrato");
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
          Generar Nuevo Contrato
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
            <label>Inquilino</label>
            <select
              name="inquilinoId"
              value={form.inquilinoId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione Inquilino</option>
              {inquilinos.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.nombre} (DNI: {i.dni})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Propiedad / Local</label>
            <select
              name="localId"
              value={form.localId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione Unidad</option>
              {locales.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.direccion} - Piso: {l.n_departamento || "N/A"} -{" "}
                  {l.tipo?.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Fecha de Inicio</label>
            <input
              name="fechaDeIngreso"
              type="date"
              value={form.fechaDeIngreso}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha de Vencimiento</label>
            <input
              name="fechaVigente"
              type="date"
              value={form.fechaVigente}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Monto Mensual ($)</label>
            <input
              name="valor"
              type="number"
              placeholder="Ej: 120000"
              value={form.valor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha Primer Aumento</label>
            <input
              name="fechaDeAumento"
              type="date"
              value={form.fechaDeAumento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <label>Documento PDF (Contrato Firmado)</label>
            <input
              type="file"
              name="clausulas"
              accept="application/pdf"
              onChange={handleChange}
              style={{ padding: "0.5rem" }}
            />
          </div>
          <button
            type="submit"
            style={{ gridColumn: "span 2", padding: "1rem" }}
          >
            Finalizar y Crear Contrato
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
        Historial de Contratos
      </h3>
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {contratos.map((c) => (
          <div
            key={c.id}
            className="card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1.5rem",
              borderLeft:
                c.estado === "vencido"
                  ? "4px solid var(--error-color)"
                  : "4px solid var(--success-color)",
            }}
          >
            <div
              style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  background:
                    c.estado === "vencido"
                      ? "var(--error-color)"
                      : "var(--accent-gradient)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                }}
              >
                📄
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontWeight: "800",
                    fontSize: "1.2rem",
                    color: "var(--text-primary)",
                  }}
                >
                  {c.Inquilino?.nombre || "Inquilino Desconocido"}
                </p>
                <p
                  style={{
                    margin: "0.2rem 0",
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  🏠 {c.Local?.direccion}{" "}
                  {c.Local?.n_departamento
                    ? `(Depto ${c.Local.n_departamento})`
                    : ""}{" "}
                  —{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {c.Local?.tipo}
                  </span>
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "0.4rem",
                    fontSize: "0.85rem",
                  }}
                >
                  <span style={{ fontWeight: "700" }}>
                    ${c.valor.toLocaleString()} / mes
                  </span>
                  <span style={{ color: "var(--text-secondary)" }}>
                    • Vence: {new Date(c.fechaVigente).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {c.clausulas && (
                <a
                  href={`http://localhost:30/${c.clausulas}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem 1rem",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                  }}
                >
                  Ver PDF
                </a>
              )}
              <Link
                to={`/contratos/${c.id}`}
                className="secondary"
                style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
              >
                Gestionar
              </Link>
              <button
                onClick={() => handleDelete(c.id)}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.85rem",
                  background: "rgba(239, 68, 68, 0.1)",
                  color: "var(--error-color)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {contratos.length === 0 && (
          <div
            className="card"
            style={{
              textAlign: "center",
              padding: "3rem",
              color: "var(--text-secondary)",
            }}
          >
            No hay contratos activos registrados.
          </div>
        )}
      </div>
    </div>
  );
};

export default Contratos;
