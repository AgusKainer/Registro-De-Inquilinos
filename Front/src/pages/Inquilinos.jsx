import { useEffect, useState } from "react";
import { getInquilinos, createInquilino } from "../services/api";

export default function Inquilinos() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ nombre: "", telefono: "", dni: "" });

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    try {
      const data = await getInquilinos();
      setItems(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function submit(e) {
    e.preventDefault();
    try {
      const created = await createInquilino(form);
      setItems((s) => [...s, created]);
      setForm({ nombre: "", telefono: "", dni: "" });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Inquilinos</h2>
      <form onSubmit={submit} style={{ marginBottom: 12 }}>
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          placeholder="Teléfono"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
        />
        <input
          placeholder="DNI"
          value={form.dni}
          onChange={(e) => setForm({ ...form, dni: e.target.value })}
        />
        <button type="submit">Agregar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>DNI</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td>{i.nombre}</td>
              <td>{i.telefono}</td>
              <td>{i.dni}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
