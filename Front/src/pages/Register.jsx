import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        try {
            const response = await fetch("http://localhost:30/alquileres/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al registrar");
            }

            setSuccess(true);
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "85vh" }}>
            <div className="card" style={{ maxWidth: "420px", width: "100%", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: "var(--accent-gradient)" }}></div>

                <h2 style={{ fontSize: "2.2rem", marginBottom: "0.5rem", fontWeight: "800", background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Registro
                </h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: "2.5rem", fontSize: "1.1rem" }}>Crea tu cuenta de Administrador</p>

                {error && (
                    <div style={{ marginBottom: "1.5rem", padding: "0.8rem", borderRadius: "12px", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", fontSize: "0.9rem", border: "1px solid rgba(239, 68, 68, 0.1)" }}>
                        {error}
                    </div>
                )}

                {success && (
                    <div style={{ marginBottom: "1.5rem", padding: "0.8rem", borderRadius: "12px", background: "rgba(16, 185, 129, 0.1)", color: "var(--success-color)", fontSize: "0.9rem", border: "1px solid rgba(16, 185, 129, 0.1)" }}>
                        ¡Registro exitoso! Redirigiendo...
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nuevo Usuario</label>
                        <input
                            type="text"
                            placeholder="Ej: puchi_admin"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" style={{ width: "100%", marginTop: "1rem", padding: "1rem" }}>
                        Crear Cuenta
                    </button>
                    <div style={{ marginTop: "1.5rem" }}>
                        <Link to="/login" style={{ fontSize: "0.9rem", fontWeight: "600" }}>¿Ya eres miembro? Inicia sesión</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
