import { useEffect, useState } from "react";
import { getInquilinos, createInquilino, deleteInquilino } from "../services/api";

export default function Inquilinos() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ nombre: "", telefono: "", dni: "" });

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    try {
      const data = await getInquilinos();
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        console.error("Data is not an array:", data);
        setItems([]);
      }
    } catch (e) {
      console.error(e);
      setItems([]);
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro de que desea eliminar este inquilino?")) {
      try {
        await deleteInquilino(id);
        fetchList();
      } catch (error) {
        alert("Error al eliminar el inquilino. Asegúrese de que no tenga contratos activos.");
      }
    }
  };

  async function submit(e) {
    e.preventDefault();
    try {
      const created = await createInquilino(form);
      setItems((s) => [...s, created]);
      setForm({ nombre: "", telefono: "", dni: "" });
      console.log("que envia el form del front: ", form);
    } catch (err) {
      console.error(err);
    }
  }

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
          Registrar Nuevo Inquilino
        </h3>
        <form
          onSubmit={submit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr auto",
            gap: "1.25rem",
            alignItems: "end",
          }}
        >
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Nombre Completo</label>
            <input
              name="nombre"
              placeholder="Ej: Sofía López"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Teléfono</label>
            <input
              name="telefono"
              placeholder="Ej: +54 9 11 ..."
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>DNI / Documento</label>
            <input
              name="dni"
              placeholder="Sin puntos ni espacios"
              value={form.dni}
              onChange={(e) => setForm({ ...form, dni: e.target.value })}
              required
            />
          </div>
          <button type="submit" style={{ padding: "0.875rem 2rem" }}>
            Añadir
          </button>
        </form>
      </div>

      <div className="card">
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            marginBottom: "1.5rem",
          }}
        >
          Listado de Inquilinos
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>DNI</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id}>
                  <td
                    style={{ fontWeight: "600", color: "var(--accent-color)" }}
                  >
                    {i.nombre}
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>
                    {i.telefono}
                  </td>
                  <td>{i.dni}</td>
                  <td>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        padding: "0.25rem 0.6rem",
                        borderRadius: "20px",
                        background: "rgba(16, 185, 129, 0.1)",
                        color: "var(--success-color)",
                        fontWeight: "700",
                      }}
                    >
                      ACTIVO
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(i.id)}
                      style={{
                        padding: "0.3rem 0.7rem",
                        fontSize: "0.75rem",
                        background: "rgba(239, 68, 68, 0.1)",
                        color: "var(--error-color)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        borderRadius: "8px"
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center",
                      padding: "3rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    No hay inquilinos registrados todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
