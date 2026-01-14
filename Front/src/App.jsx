import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Inquilinos from "./pages/Inquilinos";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="nav">
          <Link to="/">Inicio</Link> | <Link to="/inquilinos">Inquilinos</Link>
        </nav>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h2>Registro de Inquilinos</h2>
                  <p>Usa el menú para navegar.</p>
                </div>
              }
            />
            <Route path="/inquilinos" element={<Inquilinos />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
