import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"; // Reusing main css for now

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const result = await login(username, password);
        if (result.success) {
            navigate("/admin");
        } else {
            setError(result.message);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "85vh" }}>
            <div className="card" style={{ maxWidth: "420px", width: "100%", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: "var(--accent-gradient)" }}></div>

                <h2 style={{ fontSize: "2.2rem", marginBottom: "0.5rem", fontWeight: "800", background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Bienvenido
                </h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: "2.5rem", fontSize: "1.1rem" }}>Acceso Administrativo</p>

                {error && (
                    <div style={{ marginBottom: "1.5rem", padding: "0.8rem", borderRadius: "12px", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", fontSize: "0.9rem", border: "1px solid rgba(239, 68, 68, 0.1)" }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Usuario</label>
                        <input
                            type="text"
                            placeholder="Ej: admin"
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
                        Entrar al Sistema
                    </button>
                    <div style={{ marginTop: "1.5rem" }}>
                        <Link to="/register" style={{ fontSize: "0.9rem", fontWeight: "600" }}>¿No tienes una cuenta? Registrate aquí</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
