import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AdminProfile = () => {
  const { user, updateProfile } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    nombreEmpresa: user?.nombreEmpresa || "",
    email: user?.email || "",
    telefono: user?.telefono || "",
    dominio: user?.dominio || "",
    subdominio: user?.subdominio || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setMessage("✅ Perfil actualizado correctamente");
        setEditMode(false);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(`❌ ${result.message}`);
      }
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      nombreEmpresa: user?.nombreEmpresa || "",
      email: user?.email || "",
      telefono: user?.telefono || "",
      dominio: user?.dominio || "",
      subdominio: user?.subdominio || "",
    });
    setEditMode(false);
    setMessage("");
  };

  return (
    <div style={{ animation: "fadeIn 0.5s ease-out" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ margin: 0 }}>Mi Perfil</h2>
        <button
          onClick={() => (editMode ? handleCancel() : setEditMode(true))}
          style={{
            background: editMode
              ? "var(--error-color)"
              : "var(--accent-gradient)",
          }}
        >
          {editMode ? "Cancelar" : "Editar Perfil"}
        </button>
      </div>

      {message && (
        <div
          style={{
            padding: "1rem",
            borderRadius: "12px",
            marginBottom: "1.5rem",
            background: message.includes("✅")
              ? "rgba(16, 185, 129, 0.1)"
              : "rgba(239, 68, 68, 0.1)",
            color: message.includes("✅") ? "var(--success-color)" : "#ef4444",
            fontWeight: "600",
          }}
        >
          {message}
        </div>
      )}

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}
      >
        {/* Información de Usuario */}
        <div className="card">
          <h3
            style={{
              marginBottom: "1.5rem",
              borderBottom: "1px solid var(--border-color)",
              paddingBottom: "0.5rem",
            }}
          >
            Información de Usuario
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                }}
              >
                Usuario
              </label>
              <input
                type="text"
                value={user?.username || ""}
                disabled={true}
                style={{ opacity: 0.6 }}
              />
              <small style={{ color: "var(--text-secondary)" }}>
                No puede editar el nombre de usuario
              </small>
            </div>
          </div>
        </div>

        {/* Información de Empresa */}
        <div className="card">
          <h3
            style={{
              marginBottom: "1.5rem",
              borderBottom: "1px solid var(--border-color)",
              paddingBottom: "0.5rem",
            }}
          >
            Información de Empresa
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div className="form-group">
              <label>Nombre de Empresa</label>
              {editMode ? (
                <input
                  type="text"
                  name="nombreEmpresa"
                  value={formData.nombreEmpresa}
                  onChange={handleInputChange}
                  placeholder="Ej: Mi Empresa S.A."
                />
              ) : (
                <p style={{ fontSize: "1rem", fontWeight: "600" }}>
                  {formData.nombreEmpresa || "No definido"}
                </p>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="correo@empresa.com"
                />
              ) : (
                <p style={{ fontSize: "1rem" }}>
                  {formData.email || "No definido"}
                </p>
              )}
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              {editMode ? (
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="+34 666 123 456"
                />
              ) : (
                <p style={{ fontSize: "1rem" }}>
                  {formData.telefono || "No definido"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Configuración de Dominio */}
        <div className="card">
          <h3
            style={{
              marginBottom: "1.5rem",
              borderBottom: "1px solid var(--border-color)",
              paddingBottom: "0.5rem",
            }}
          >
            Configuración de Dominio
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div className="form-group">
              <label>Dominio Personalizado</label>
              {editMode ? (
                <input
                  type="text"
                  name="dominio"
                  value={formData.dominio}
                  onChange={handleInputChange}
                  placeholder="miempresa.com"
                />
              ) : (
                <p style={{ fontSize: "1rem" }}>
                  {formData.dominio
                    ? `https://${formData.dominio}`
                    : "No definido"}
                </p>
              )}
              <small style={{ color: "var(--text-secondary)" }}>
                Debe ser único en el sistema
              </small>
            </div>

            <div className="form-group">
              <label>Subdominio</label>
              {editMode ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <input
                    type="text"
                    name="subdominio"
                    value={formData.subdominio}
                    onChange={handleInputChange}
                    placeholder="miempresa"
                  />
                  <span style={{ color: "var(--text-secondary)" }}>
                    .tuapp.com
                  </span>
                </div>
              ) : (
                <p style={{ fontSize: "1rem" }}>
                  {formData.subdominio
                    ? `https://${formData.subdominio}.tuapp.com`
                    : "No definido"}
                </p>
              )}
              <small style={{ color: "var(--text-secondary)" }}>
                Acceso multi-tenant. Debe ser único.
              </small>
            </div>
          </div>
        </div>

        {/* Resumen de Configuración Actual */}
        <div className="card">
          <h3
            style={{
              marginBottom: "1.5rem",
              borderBottom: "1px solid var(--border-color)",
              paddingBottom: "0.5rem",
            }}
          >
            Configuración Activa
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              fontSize: "0.9rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-secondary)" }}>ID Admin:</span>
              <span style={{ fontWeight: "600" }}>
                {user?.id?.slice(0, 8)}...
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-secondary)" }}>Usuario:</span>
              <span style={{ fontWeight: "600" }}>{user?.username}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-secondary)" }}>Estado:</span>
              <span
                style={{
                  fontWeight: "600",
                  color: "var(--success-color)",
                  padding: "0.2rem 0.6rem",
                  background: "rgba(16, 185, 129, 0.1)",
                  borderRadius: "6px",
                }}
              >
                Activo
              </span>
            </div>
          </div>
        </div>
      </div>

      {editMode && (
        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              padding: "1rem",
              fontSize: "1rem",
              fontWeight: "700",
              background: "var(--accent-gradient)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Guardando cambios..." : "Guardar Cambios"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
