const BASE = import.meta.env.VITE_API_BASE || "http://localhost:30/alquileres";

// Inquilinos
async function getInquilinos() {
  const res = await fetch(`${BASE}/inquilino`);
  return res.json();
}

async function createInquilino(payload) {
  const res = await fetch(`${BASE}/inquilino`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  console.log("que envio al back desde la api: ", payload);

  return res.json();
}

// Locales
async function getLocales() {
  const res = await fetch(`${BASE}/local`);
  return res.json();
}

async function createLocal(payload) {
  const isFormData = payload instanceof FormData;
  const headers = isFormData ? {} : { "Content-Type": "application/json" };
  const body = isFormData ? payload : JSON.stringify(payload);

  const res = await fetch(`${BASE}/local`, {
    method: "POST",
    headers: headers,
    body: body,
  });
  return res.json();
}

// Contratos
async function getContratos() {
  const res = await fetch(`${BASE}/contrato`);
  return res.json();
}

async function createContrato(payload) {
  // Check if payload is FormData (for file upload) or JSON
  const isFormData = payload instanceof FormData;
  const headers = isFormData ? {} : { "Content-Type": "application/json" };
  const body = isFormData ? payload : JSON.stringify(payload);

  const res = await fetch(`${BASE}/contrato`, {
    method: "POST",
    headers: headers,
    body: body,
  });
  return res.json();
}

export {
  getInquilinos,
  createInquilino,
  getLocales,
  createLocal,
  getContratos,
  createContrato,
};
