import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getContratoById,
  updateContrato,
  createReparacion,
  renewContrato,
} from "../services/api";

const ContratoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contrato, setContrato] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  // Repair state
  const [showRepairForm, setShowRepairForm] = useState(false);
  const [repairForm, setRepairForm] = useState({
    descripcion: "",
    costo: 0,
    responsable: "INQUILINO",
  });

  // Renewal state
  const [showRenewForm, setShowRenewForm] = useState(false);
  const [renewData, setRenewData] = useState({
    fechaInicio: "",
    fechaFin: "",
    nuevoValor: "",
    clausulas: null,
  });

  useEffect(() => {
    fetchContrato();
  }, [id]);

  const fetchContrato = async () => {
    try {
      const data = await getContratoById(id);
      setContrato(data);
      setEditedData({
        valor: data.valor,
        fechaVigente: data.fechaVigente.split("T")[0],
        estado: data.estado,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateContrato(id, editedData);
      setEditMode(false);
      fetchContrato();
    } catch (error) {
      alert("Error al actualizar");
    }
  };

  const handleAddRepair = async (e) => {
    e.preventDefault();
    try {
      await createReparacion({ ...repairForm, contratoId: id });
      setShowRepairForm(false);
      setRepairForm({ descripcion: "", costo: 0, responsable: "INQUILINO" });
      fetchContrato();
    } catch (error) {
      alert("Error al añadir reparación");
    }
  };

  const handleRenew = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fechaInicio", renewData.fechaInicio);
      formData.append("fechaFin", renewData.fechaFin);
      formData.append("nuevoValor", renewData.nuevoValor);
      if (renewData.clausulas)
        formData.append("clausulas", renewData.clausulas);

      await renewContrato(id, formData);
      setShowRenewForm(false);
      fetchContrato();
    } catch (error) {
      alert("Error al renovar");
    }
  };

  if (loading)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Cargando detalles...
      </div>
    );
  if (!contrato)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Contrato no encontrado
      </div>
    );

  return (
    <div style={{ animation: "fadeIn 0.5s ease-out" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <button
          className="secondary"
          onClick={() => navigate("/admin")}
          style={{ padding: "0.5rem 1rem" }}
        >
          ← Volver
        </button>
        <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "800" }}>
          Gestión de Contrato
        </h1>
        <button
          onClick={() => setEditMode(!editMode)}
          style={{
            background: editMode
              ? "var(--success-color)"
              : "var(--accent-gradient)",
          }}
        >
          {editMode ? "Guardar Cambios" : "Modificar Datos"}
        </button>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 350px",
          gap: "2rem",
        }}
      >
        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Basic Info Card */}
          <div className="card">
            <h3
              style={{
                marginBottom: "1.5rem",
                borderBottom: "1px solid var(--border-color)",
                paddingBottom: "0.5rem",
              }}
            >
              Información General
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <div className="form-group">
                <label>Valor Mensual</label>
                {editMode ? (
                  <input
                    type="number"
                    value={editedData.valor}
                    onChange={(e) =>
                      setEditedData({ ...editedData, valor: e.target.value })
                    }
                  />
                ) : (
                  <p style={{ fontSize: "1.2rem", fontWeight: "700" }}>
                    ${contrato.valor.toLocaleString()}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Estado Actual</label>
                {editMode ? (
                  <select
                    value={editedData.estado}
                    onChange={(e) =>
                      setEditedData({ ...editedData, estado: e.target.value })
                    }
                  >
                    <option value="activo">Activo</option>
                    <option value="vencido">Vencido</option>
                    <option value="rescindido">Rescindido</option>
                  </select>
                ) : (
                  <span
                    style={{
                      padding: "0.3rem 0.8rem",
                      borderRadius: "20px",
                      background:
                        contrato.estado === "activo"
                          ? "rgba(16, 185, 129, 0.1)"
                          : "rgba(239, 68, 68, 0.1)",
                      color:
                        contrato.estado === "activo"
                          ? "var(--success-color)"
                          : "#ef4444",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      fontSize: "0.8rem",
                      display: "inline-block",
                      marginTop: "0.5rem",
                    }}
                  >
                    {contrato.estado}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Fecha de Inicio Original</label>
                <p style={{ fontSize: "1.1rem" }}>
                  {new Date(contrato.fechaDeIngreso).toLocaleDateString()}
                </p>
              </div>
              <div className="form-group">
                <label>Fecha de Vencimiento</label>
                {editMode ? (
                  <input
                    type="date"
                    value={editedData.fechaVigente}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        fechaVigente: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p style={{ fontSize: "1.1rem" }}>
                    {new Date(contrato.fechaVigente).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Próximo Aumento</label>
                <p style={{ fontSize: "1.1rem" }}>
                  {new Date(contrato.fechaDeAumento).toLocaleDateString()}
                </p>
              </div>
              <div className="form-group">
                <label>Contrato PDF</label>
                <a
                  href={`http://localhost:30/${contrato.clausulas}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary"
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  📄 Ver Documento
                </a>
              </div>
            </div>
            {editMode && (
              <button
                onClick={handleUpdate}
                style={{ marginTop: "1.5rem", width: "100%" }}
              >
                Confirmar Cambios en Contrato
              </button>
            )}
          </div>

          {/* Repairs Section */}
          <div className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ margin: 0 }}>Reparaciones y Mantenimiento</h3>
              <button
                className="secondary"
                onClick={() => setShowRepairForm(!showRepairForm)}
                style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
              >
                {showRepairForm ? "Cancelar" : "+ Agregar Nota"}
              </button>
            </div>

            {showRepairForm && (
              <form
                onSubmit={handleAddRepair}
                style={{
                  background: "rgba(0,0,0,0.02)",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  marginBottom: "1.5rem",
                }}
              >
                <div className="form-group">
                  <label>Descripción del Arreglo</label>
                  <textarea
                    required
                    value={repairForm.descripcion}
                    onChange={(e) =>
                      setRepairForm({
                        ...repairForm,
                        descripcion: e.target.value,
                      })
                    }
                    placeholder="Ej: Reparación de cañeria de cocina..."
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div className="form-group">
                    <label>Costo ($)</label>
                    <input
                      type="number"
                      value={repairForm.costo}
                      onChange={(e) =>
                        setRepairForm({ ...repairForm, costo: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Responsable</label>
                    <select
                      value={repairForm.responsable}
                      onChange={(e) =>
                        setRepairForm({
                          ...repairForm,
                          responsable: e.target.value,
                        })
                      }
                    >
                      <option value="INQUILINO">Inquilino</option>
                      <option value="DUENO">Dueño</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  style={{ width: "100%", marginTop: "1rem" }}
                >
                  Registrar Reparación
                </button>
              </form>
            )}

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {contrato.Reparacions &&
                contrato.Reparacions.map((r) => (
                  <div
                    key={r.id}
                    style={{
                      padding: "1rem",
                      border: "1px solid var(--border-color)",
                      borderRadius: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <p style={{ margin: 0, fontWeight: "600" }}>
                        {r.descripcion}
                      </p>
                      <small style={{ color: "var(--text-secondary)" }}>
                        {new Date(r.fecha).toLocaleDateString()} • Pagó:{" "}
                        <b>{r.responsable}</b>
                      </small>
                    </div>
                    <span style={{ fontWeight: "700" }}>
                      ${r.costo.toLocaleString()}
                    </span>
                  </div>
                ))}
              {(!contrato.Reparacions || contrato.Reparacions.length === 0) && (
                <p
                  style={{
                    textAlign: "center",
                    color: "var(--text-secondary)",
                    padding: "1rem",
                  }}
                >
                  No hay reparaciones registradas.
                </p>
              )}
            </div>
          </div>

          {/* Renewals History */}
          <div className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ margin: 0 }}>Historial de Renovaciones</h3>
              <button
                className="secondary"
                onClick={() => setShowRenewForm(!showRenewForm)}
                style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
              >
                {showRenewForm ? "Cerrar" : "Renovar Contrato"}
              </button>
            </div>

            {showRenewForm && (
              <form
                onSubmit={handleRenew}
                style={{
                  background: "rgba(0,0,0,0.02)",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div className="form-group">
                    <label>Nueva Fecha Inicio</label>
                    <input
                      type="date"
                      required
                      value={renewData.fechaInicio}
                      onChange={(e) =>
                        setRenewData({
                          ...renewData,
                          fechaInicio: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Nueva Fecha Vencimiento</label>
                    <input
                      type="date"
                      required
                      value={renewData.fechaFin}
                      onChange={(e) =>
                        setRenewData({ ...renewData, fechaFin: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Nuevo Valor Mensual ($)</label>
                  <input
                    type="number"
                    required
                    value={renewData.nuevoValor}
                    onChange={(e) =>
                      setRenewData({ ...renewData, nuevoValor: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Nuevo Contrato PDF (Opcional)</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) =>
                      setRenewData({
                        ...renewData,
                        clausulas: e.target.files[0],
                      })
                    }
                  />
                </div>
                <button
                  type="submit"
                  style={{ width: "100%", marginTop: "1rem" }}
                >
                  Procesar Renovación
                </button>
              </form>
            )}

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {contrato.Renovacions &&
                contrato.Renovacions.map((ren) => (
                  <div
                    key={ren.id}
                    style={{
                      padding: "1rem",
                      border: "1px solid var(--border-color)",
                      borderRadius: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ fontWeight: "700" }}>
                        Nuevo valor: ${ren.nuevoValor.toLocaleString()}
                      </span>
                      <small style={{ color: "var(--text-secondary)" }}>
                        Vigencia hasta:{" "}
                        {new Date(ren.fechaFin).toLocaleDateString()}
                      </small>
                    </div>
                    {ren.pdf && (
                      <a
                        href={`http://localhost:30/${ren.pdf}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--accent-color)",
                        }}
                      >
                        Descargar PDF de Renovación
                      </a>
                    )}
                  </div>
                ))}
              {(!contrato.Renovacions || contrato.Renovacions.length === 0) && (
                <p
                  style={{
                    textAlign: "center",
                    color: "var(--text-secondary)",
                    padding: "1rem",
                  }}
                >
                  Aún no se han realizado renovaciones.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div className="card" style={{ textAlign: "center" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "var(--accent-gradient)",
                margin: "0 auto 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                color: "white",
              }}
            >
              {contrato.Inquilino.nombre.charAt(0)}
            </div>
            <h4 style={{ margin: "0 0 0.5rem" }}>
              {contrato.Inquilino.nombre}
            </h4>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
                margin: 0,
              }}
            >
              DNI: {contrato.Inquilino.dni}
            </p>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
                marginTop: "0.25rem",
              }}
            >
              Tel: {contrato.Inquilino.telefono}
            </p>
          </div>

          <div className="card">
            <h4
              style={{
                margin: "0 0 1rem",
                borderBottom: "1px solid var(--border-color)",
                paddingBottom: "0.5rem",
              }}
            >
              Ubicación
            </h4>
            <p style={{ fontWeight: "700", margin: "0 0 0.5rem" }}>
              {contrato.Local.direccion || "Dirección no especificada"}
            </p>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
                margin: 0,
              }}
            >
              Tipo: {contrato.Local.tipo?.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContratoDetalle;
