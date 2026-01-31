import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Inquilinos from "./Inquilinos";
import Locales from "./Locales";
import Contratos from "./Contratos";
import "../App.css";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("inquilinos");

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="dashboard">
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
                <div>
                    <h1 style={{ marginBottom: "0.25rem" }}>Admin Dashboard</h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>Bienvenido, <b>{user?.username}</b></p>
                </div>
                <button onClick={handleLogout} className="secondary" style={{ padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}>
                    Cerrar Sesión
                </button>
            </header>

            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", padding: "0.5rem", background: "var(--surface-color)", borderRadius: "16px", width: "fit-content", backdropFilter: "blur(10px)" }}>
                {["inquilinos", "locales", "contratos"].map((tab) => (
                    <button
                        key={tab}
                        className="secondary"
                        style={{
                            border: "none",
                            borderRadius: "12px",
                            padding: "0.75rem 1.5rem",
                            background: activeTab === tab ? "var(--accent-gradient)" : "transparent",
                            color: activeTab === tab ? "white" : "var(--text-primary)",
                            boxShadow: activeTab === tab ? "0 4px 12px rgba(59, 130, 246, 0.3)" : "none",
                            textTransform: "capitalize"
                        }}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="card" style={{ animation: "fadeIn 0.5s ease-out" }}>
                {activeTab === "inquilinos" && <Inquilinos />}
                {activeTab === "locales" && <Locales />}
                {activeTab === "contratos" && <Contratos />}
            </div>
        </div>
    );
};

export default Dashboard;
