import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocalById,
  updateLocal,
  clearLocalActual,
  clearSuccess,
} from "../redux/slices/localSlice";

const LocalDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    localActual: local,
    loading,
    error,
    success,
  } = useSelector((state) => state.locales);

  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [newPhotos, setNewPhotos] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchLocalById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (local) {
      setEditedData({
        direccion: local.direccion,
        n_departamento: local.n_departamento,
        tipo: local.tipo,
        observaciones: local.observaciones,
      });
    }
  }, [local]);

  useEffect(() => {
    if (success) {
      alert("Cambios guardados correctamente");
      dispatch(clearSuccess());
      dispatch(fetchLocalById(id));
    }
  }, [success, dispatch, id]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("direccion", editedData.direccion);
      formData.append("n_departamento", editedData.n_departamento);
      formData.append("tipo", editedData.tipo);
      formData.append("observaciones", editedData.observaciones);

      dispatch(updateLocal({ id, data: formData }));
      setEditMode(false);
    } catch (error) {
      alert("Error al actualizar los datos");
    }
  };

  const handleUploadPhotos = async (e) => {
    e.preventDefault();
    if (!newPhotos) return;

    setUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < newPhotos.length; i++) {
        formData.append("fotos", newPhotos[i]);
      }

      dispatch(updateLocal({ id, data: formData }));
      setNewPhotos(null);
      alert("Fotos subidas correctamente");
    } catch (error) {
      alert("Error al subir fotos");
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Cargando detalles de la propiedad...
      </div>
    );
  if (error)
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        Error: {error}
      </div>
    );
  if (!local)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Propiedad no encontrada
      </div>
    );

  const activeContract = local.Contratos
    ? local.Contratos.find((c) => c.estado === "activo")
    : null;

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
          Gestión de Propiedad
        </h1>
        <button
          onClick={() => {
            if (editMode) handleUpdate();
            else setEditMode(true);
          }}
          style={{
            background: editMode
              ? "var(--success-color)"
              : "var(--accent-gradient)",
          }}
        >
          {editMode ? "Guardar Cambios" : "Editar Datos"}
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
                <label>Dirección</label>
                {editMode ? (
                  <input
                    type="text"
                    value={editedData.direccion}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        direccion: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                    {local.direccion || "Sin dirección"}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>N° Departamento / Piso</label>
                {editMode ? (
                  <input
                    type="text"
                    value={editedData.n_departamento}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        n_departamento: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p style={{ fontSize: "1.1rem" }}>
                    {local.n_departamento || "N/A"}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Tipo de Unidad</label>
                {editMode ? (
                  <select
                    value={editedData.tipo}
                    onChange={(e) =>
                      setEditedData({ ...editedData, tipo: e.target.value })
                    }
                  >
                    <option value="vivienda">🏘️ Vivienda</option>
                    <option value="depto">🏢 Departamento</option>
                    <option value="local_comercial">🛍️ Local Comercial</option>
                  </select>
                ) : (
                  <p
                    style={{ fontSize: "1.1rem", textTransform: "capitalize" }}
                  >
                    {local.tipo}
                  </p>
                )}
              </div>
              <div className="form-group" style={{ gridColumn: "span 2" }}>
                <label>Observaciones</label>
                {editMode ? (
                  <textarea
                    value={editedData.observaciones}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        observaciones: e.target.value,
                      })
                    }
                    style={{ minHeight: "100px" }}
                  />
                ) : (
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "var(--text-secondary)",
                      lineHeight: "1.5",
                    }}
                  >
                    {local.observaciones || "Sin observaciones."}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ margin: 0 }}>Galería de Fotos</h3>
              <button
                className="secondary"
                onClick={() => document.getElementById("photo-upload").click()}
                disabled={uploading}
                style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
              >
                {uploading ? "Subiendo..." : "+ Añadir Fotos (Varias)"}
              </button>
              <input
                id="photo-upload"
                type="file"
                multiple={true}
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  setNewPhotos(e.target.files);
                }}
              />
            </div>

            {newPhotos && (
              <div
                style={{
                  background: "rgba(16, 185, 129, 0.1)",
                  padding: "1rem",
                  borderRadius: "12px",
                  marginBottom: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{ fontWeight: "600", color: "var(--success-color)" }}
                >
                  ✅ {newPhotos.length} fotos listas para subir
                </span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    className="secondary"
                    onClick={() => setNewPhotos(null)}
                    style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem" }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleUploadPhotos}
                    style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem" }}
                  >
                    Confirmar Subida
                  </button>
                </div>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "1rem",
              }}
            >
              {local.Fotos &&
                local.Fotos.map((foto, index) => (
                  <div
                    key={foto.id}
                    className="gallery-item"
                    style={{
                      aspectRatio: "1/1",
                      borderRadius: "12px",
                      overflow: "hidden",
                      border: "1px solid var(--border-color)",
                      position: "relative",
                    }}
                  >
                    <img
                      src={`http://localhost:30/${foto.url}`}
                      alt={`Foto ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        window.open(`http://localhost:30/${foto.url}`, "_blank")
                      }
                    />
                  </div>
                ))}
              {(!local.Fotos || local.Fotos.length === 0) && (
                <p
                  style={{
                    gridColumn: "span 3",
                    textAlign: "center",
                    color: "var(--text-secondary)",
                    padding: "2rem",
                  }}
                >
                  No hay fotos registradas.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div className="card">
            <h4
              style={{
                margin: "0 0 1rem",
                borderBottom: "1px solid var(--border-color)",
                paddingBottom: "0.5rem",
              }}
            >
              Estado de Alquiler
            </h4>
            {activeContract ? (
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <div
                  style={{
                    padding: "0.5rem",
                    borderRadius: "12px",
                    background: "rgba(16, 185, 129, 0.1)",
                    color: "var(--success-color)",
                    fontWeight: "800",
                    marginBottom: "1rem",
                  }}
                >
                  ALQUILADO
                </div>
                <p style={{ margin: "0 0 0.5rem", fontWeight: "600" }}>
                  {activeContract.Inquilino.nombre}
                </p>
                <Link
                  to={`/contratos/${activeContract.id}`}
                  className="secondary"
                  style={{
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    display: "inline-block",
                    marginTop: "0.5rem",
                  }}
                >
                  Ir al Contrato →
                </Link>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <div
                  style={{
                    padding: "0.5rem",
                    borderRadius: "12px",
                    background: "rgba(0, 0, 0, 0.05)",
                    color: "var(--text-secondary)",
                    fontWeight: "800",
                    marginBottom: "1rem",
                  }}
                >
                  DISPONIBLE
                </div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  No hay contratos activos para esta unidad.
                </p>
                <Link
                  to="/contratos"
                  className="secondary"
                  style={{
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    display: "inline-block",
                    marginTop: "0.5rem",
                  }}
                >
                  Crear Contrato
                </Link>
              </div>
            )}
          </div>

          <div className="card">
            <h4
              style={{
                margin: "0 0 1rem",
                borderBottom: "1px solid var(--border-color)",
                paddingBottom: "0.5rem",
              }}
            >
              Estadísticas
            </h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}
              >
                Fotos totales:
              </span>
              <span style={{ fontWeight: "600" }}>
                {local.Fotos?.length || 0}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span
                style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}
              >
                Contratos históricos:
              </span>
              <span style={{ fontWeight: "600" }}>
                {local.Contratos?.length || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalDetalle;
