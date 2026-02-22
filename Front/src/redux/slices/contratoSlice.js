import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAutomatic } from "../api";

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const getAuthHeadersFormData = () => {
  const token = sessionStorage.getItem("token");
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

// Thunks
export const fetchContratos = createAsyncThunk(
  "contratos/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${fetchAutomatic()}/contrato`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Error obteniendo contratos");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchContratoById = createAsyncThunk(
  "contratos/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${fetchAutomatic()}/contrato/${id}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Contrato no encontrado");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createContrato = createAsyncThunk(
  "contratos/create",
  async (payload, { rejectWithValue }) => {
    try {
      const isFormData = payload instanceof FormData;
      const headers = isFormData ? getAuthHeadersFormData() : getAuthHeaders();
      const body = isFormData ? payload : JSON.stringify(payload);

      const res = await fetch(`${fetchAutomatic()}/contrato`, {
        method: "POST",
        headers,
        body,
      });
      if (!res.ok) throw new Error("Error creando contrato");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateContrato = createAsyncThunk(
  "contratos/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${fetchAutomatic()}/contrato/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        let err = "Error actualizando contrato";
        try {
          const body = await res.json();
          err = body.message || body.error || JSON.stringify(body);
        } catch (e) {}
        throw new Error(err);
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const renewContrato = createAsyncThunk(
  "contratos/renew",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const isFormData = payload instanceof FormData;
      const headers = isFormData ? getAuthHeadersFormData() : getAuthHeaders();
      const body = isFormData ? payload : JSON.stringify(payload);

      const res = await fetch(`${fetchAutomatic()}/contrato/${id}/renovar`, {
        method: "POST",
        headers,
        body,
      });
      if (!res.ok) {
        let err = "Error renovando contrato";
        try {
          const body = await res.json();
          err = body.message || body.error || JSON.stringify(body);
        } catch (e) {}
        throw new Error(err);
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteContrato = createAsyncThunk(
  "contratos/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${fetchAutomatic()}/contrato/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Error eliminando contrato");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  contratos: [],
  contratoActual: null,
  loading: false,
  error: null,
  success: false,
};

const contratoSlice = createSlice({
  name: "contratos",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearContratoActual: (state) => {
      state.contratoActual = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchContratos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContratos.fulfilled, (state, action) => {
        state.loading = false;
        state.contratos = action.payload;
      })
      .addCase(fetchContratos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch por ID
      .addCase(fetchContratoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContratoById.fulfilled, (state, action) => {
        state.loading = false;
        state.contratoActual = action.payload;
      })
      .addCase(fetchContratoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createContrato.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContrato.fulfilled, (state, action) => {
        state.loading = false;
        state.contratos.push(action.payload);
        state.success = true;
      })
      .addCase(createContrato.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateContrato.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContrato.fulfilled, (state, action) => {
        state.loading = false;
        state.contratoActual = action.payload;
        const idx = state.contratos.findIndex(
          (c) => c.id === action.payload.id,
        );
        if (idx !== -1) state.contratos[idx] = action.payload;
        state.success = true;
      })
      .addCase(updateContrato.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Renew
      .addCase(renewContrato.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(renewContrato.fulfilled, (state, action) => {
        state.loading = false;
        state.contratoActual = action.payload;
        const idx = state.contratos.findIndex(
          (c) => c.id === action.payload.id,
        );
        if (idx !== -1) state.contratos[idx] = action.payload;
        state.success = true;
      })
      .addCase(renewContrato.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteContrato.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContrato.fulfilled, (state, action) => {
        state.loading = false;
        state.contratos = state.contratos.filter(
          (c) => c.id !== action.meta.arg,
        );
        state.success = true;
      })
      .addCase(deleteContrato.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, clearContratoActual } =
  contratoSlice.actions;
export default contratoSlice.reducer;
