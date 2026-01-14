const BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

async function getInquilinos() {
  const res = await fetch(`${BASE}/inquilinos`);
  return res.json();
}

async function createInquilino(payload) {
  const res = await fetch(`${BASE}/inquilinos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export { getInquilinos, createInquilino };
