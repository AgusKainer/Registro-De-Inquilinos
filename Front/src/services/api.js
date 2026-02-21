const BASE = import.meta.env.VITE_API_BASE || "http://localhost:30/alquileres";

// Obtener el token del sessionStorage
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

// Obtener headers para FormData (no incluye Content-Type)
const getAuthHeadersFormData = () => {
  const token = sessionStorage.getItem("token");
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

// Inquilinos
async function getInquilinos() {
  const res = await fetch(`${BASE}/inquilino`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Error obteniendo inquilinos");
  return res.json();
}

async function createInquilino(payload) {
  const res = await fetch(`${BASE}/inquilino`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error creando inquilino");
  console.log("que envio al back desde la api: ", payload);

  return res.json();
}

async function deleteInquilino(id) {
  const res = await fetch(`${BASE}/inquilino/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Error eliminando inquilino");
  return res.json();
}

// Locales
async function getLocales() {
  const res = await fetch(`${BASE}/local`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Error obteniendo locales");
  return res.json();
}

async function getLocalById(id) {
  const res = await fetch(`${BASE}/local/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Local no encontrado");
  return res.json();
}

async function createLocal(payload) {
  const isFormData = payload instanceof FormData;
  const headers = isFormData ? getAuthHeadersFormData() : getAuthHeaders();
  const body = isFormData ? payload : JSON.stringify(payload);

  const res = await fetch(`${BASE}/local`, {
    method: "POST",
    headers: headers,
    body: body,
  });
  if (!res.ok) throw new Error("Error creando local");
  return res.json();
}

async function updateLocal(id, payload) {
  const isFormData = payload instanceof FormData;
  const headers = isFormData ? getAuthHeadersFormData() : getAuthHeaders();
  const body = isFormData ? payload : JSON.stringify(payload);

  const res = await fetch(`${BASE}/local/${id}`, {
    method: "PUT",
    headers: headers,
    body: body,
  });
  if (!res.ok) throw new Error("Error actualizando local");
  return res.json();
}

async function deleteLocal(id) {
  const res = await fetch(`${BASE}/local/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Error eliminando local");
  return res.json();
}

// Contratos
async function getContratos() {
  const res = await fetch(`${BASE}/contrato`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Error obteniendo contratos");
  return res.json();
}

// Contrato por ID
async function getContratoById(id) {
  const res = await fetch(`${BASE}/contrato/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Contrato no encontrado");
  return res.json();
}

async function createContrato(payload) {
  const isFormData = payload instanceof FormData;
  const headers = isFormData ? getAuthHeadersFormData() : getAuthHeaders();
  const body = isFormData ? payload : JSON.stringify(payload);

  const res = await fetch(`${BASE}/contrato`, {
    method: "POST",
    headers: headers,
    body: body,
  });
  if (!res.ok) throw new Error("Error creando contrato");
  return res.json();
}

async function updateContrato(id, payload) {
  const res = await fetch(`${BASE}/contrato/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let err = "Error actualizando contrato";
    try {
      const body = await res.json();
      err = body.message || body.error || JSON.stringify(body);
    } catch (e) {}
    throw new Error(err);
  }
  return res.json();
}

async function renewContrato(id, payload) {
  const isFormData = payload instanceof FormData;
  const headers = isFormData ? getAuthHeadersFormData() : getAuthHeaders();
  const body = isFormData ? payload : JSON.stringify(payload);

  const res = await fetch(`${BASE}/contrato/${id}/renovar`, {
    method: "POST",
    headers: headers,
    body: body,
  });
  if (!res.ok) {
    let err = "Error renovando contrato";
    try {
      const body = await res.json();
      err = body.message || body.error || JSON.stringify(body);
    } catch (e) {}
    throw new Error(err);
  }
  return res.json();
}

async function createReparacion(payload) {
  const isFormData = payload instanceof FormData;
  const headers = isFormData ? getAuthHeadersFormData() : getAuthHeaders();
  const body = isFormData ? payload : JSON.stringify(payload);

  const res = await fetch(`${BASE}/reparacion`, {
    method: "POST",
    headers: headers,
    body: body,
  });
  if (!res.ok) throw new Error("Error creando reparación");
  return res.json();
}

async function deleteContrato(id) {
  const res = await fetch(`${BASE}/contrato/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Error eliminando contrato");
  return res.json();
}

// Perfil del Admin
async function updateAdminProfile(profileData) {
  const res = await fetch(`${BASE}/auth/profile`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(profileData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error actualizando perfil");
  }
  return res.json();
}

export {
  getInquilinos,
  createInquilino,
  getLocales,
  getLocalById,
  createLocal,
  updateLocal,
  getContratos,
  createContrato,
  getContratoById,
  updateContrato,
  renewContrato,
  createReparacion,
  deleteInquilino,
  deleteLocal,
  deleteContrato,
  updateAdminProfile,
};
