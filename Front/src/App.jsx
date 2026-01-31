import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TenantView from "./pages/TenantView";
import Inquilinos from "./pages/Inquilinos"; // Keeping original page just in case

import Register from "./pages/Register";

import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <nav>
            <div className="nav-links">
              <Link to="/" style={{ fontSize: "1.1rem", fontWeight: "700", background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>InquiliCheck</Link>
              <Link to="/admin">Dashboard</Link>
            </div>
            <ThemeToggle />
          </nav>

          <div className="container">
            <main>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<TenantView />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/inquilinos" element={<Inquilinos />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
