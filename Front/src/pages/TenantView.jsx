import { useState } from "react";
import "../App.css";

const TenantView = () => {
  const [dni, setDni] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch(
        `http://localhost:30/tenant/inquilino/dni/${dni}`,
      );
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("No se encontró inquilino con ese DNI.");
        }
        throw new Error("Error al buscar inquilino.");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="tenant-view"
      style={{ maxWidth: "700px", margin: "0 auto" }}
    >
      <div className="card">
        <h2
          style={{
            fontSize: "2.2rem",
            fontWeight: "800",
            background: "var(--accent-gradient)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.5rem",
          }}
        >
          Tus Contratos
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "2rem",
            fontSize: "1.1rem",
          }}
        >
          Ingresa tu DNI para acceder a tu historial de alquileres.
        </p>

        <form onSubmit={handleSearch} style={{ display: "flex", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Número de DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
            style={{ flex: 1 }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ minWidth: "120px" }}
          >
            {loading ? "..." : "Consultar"}
          </button>
        </form>

        {error && (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              borderRadius: "12px",
              background: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              fontSize: "0.9rem",
              border: "1px solid rgba(239, 68, 68, 0.2)",
            }}
          >
            {error}
          </div>
        )}
      </div>

      {data && (
        <div style={{ animation: "fadeIn 0.8s ease-out" }}>
          <div
            className="card"
            style={{ borderLeft: "4px solid var(--success-color)" }}
          >
            <h3 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>
              Bienvenido, {data.nombre}
            </h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
              Hemos encontrado la siguiente información asociada a tu perfil.
            </p>

            <div style={{ display: "grid", gap: "1.5rem" }}>
              {data.Contratos && data.Contratos.length > 0 ? (
                data.Contratos.map((contrato) => (
                  <div
                    key={contrato.id}
                    className="glass"
                    style={{
                      padding: "1.5rem",
                      borderRadius: "16px",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1.2rem",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "700",
                          fontSize: "1.3rem",
                          color: "var(--accent-color)",
                        }}
                      >
                        ${contrato.valor.toLocaleString()}{" "}
                        <small
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--text-secondary)",
                            fontWeight: "400",
                          }}
                        >
                          /mes
                        </small>
                      </span>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          padding: "0.35rem 0.85rem",
                          borderRadius: "20px",
                          background: "var(--border-color)",
                          fontWeight: "600",
                        }}
                      >
                        Vence:{" "}
                        {new Date(contrato.fechaVigente).toLocaleDateString()}
                      </span>
                    </div>

                    {contrato.Local && (
                      <div
                        style={{
                          marginBottom: "1.5rem",
                          display: "flex",
                          gap: "1rem",
                          alignItems: "flex-start",
                        }}
                      >
                        {contrato.Local.Fotos &&
                          contrato.Local.Fotos.length > 0 && (
                            <img
                              src={`http://localhost:30/${contrato.Local.Fotos[0].url}`}
                              alt="Propiedad"
                              style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "12px",
                                objectFit: "cover",
                                border: "1px solid var(--border-color)",
                              }}
                            />
                          )}
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontWeight: "700",
                              fontSize: "1.05rem",
                            }}
                          >
                            🏠 {contrato.Local.direccion}
                          </p>
                          <p
                            style={{
                              margin: "0.2rem 0",
                              fontSize: "0.9rem",
                              color: "var(--text-secondary)",
                              textTransform: "capitalize",
                            }}
                          >
                            {contrato.Local.tipo}{" "}
                            {contrato.Local.n_departamento
                              ? `| Depto: ${contrato.Local.n_departamento}`
                              : ""}
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.85rem",
                              fontStyle: "italic",
                              color: "var(--text-secondary)",
                              lineHeight: "1.4",
                            }}
                          >
                            {contrato.Local.observaciones?.substring(0, 100)}...
                          </p>
                        </div>
                      </div>
                    )}

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                        fontSize: "0.95rem",
                        padding: "1rem",
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "12px",
                        marginBottom: "1rem",
                      }}
                    >
                      <p>
                        <span
                          style={{
                            color: "var(--text-secondary)",
                            fontWeight: "500",
                          }}
                        >
                          Inicio:
                        </span>{" "}
                        {new Date(contrato.fechaDeIngreso).toLocaleDateString()}
                      </p>
                      <p>
                        <span
                          style={{
                            color: "var(--text-secondary)",
                            fontWeight: "500",
                          }}
                        >
                          Próximo Aumento:
                        </span>{" "}
                        {new Date(contrato.fechaDeAumento).toLocaleDateString()}
                      </p>
                    </div>

                    {contrato.clausulas && (
                      <a
                        href={`http://localhost:30/${contrato.clausulas}`}
                        target="_blank"
                        rel="noreferrer"
                        className="secondary"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.6rem",
                          padding: "0.85rem",
                          borderRadius: "12px",
                          background: "var(--border-color)",
                          fontWeight: "700",
                          textAlign: "center",
                          justifyContent: "center",
                          color: "var(--text-primary)",
                          textDecoration: "none",
                        }}
                      >
                        📄 Ver Contrato Firmado (PDF)
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    color: "var(--text-secondary)",
                    padding: "2rem",
                  }}
                >
                  No posees contratos registrados actualmente.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantView;
