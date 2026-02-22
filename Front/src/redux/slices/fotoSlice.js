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

export const fetchFotos = createAsyncThunk(
  "fotos/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${fetchAutomatic()}/foto`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Error obteniendo fotos");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchFotoById = createAsyncThunk(
  "fotos/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${fetchAutomatic()}/foto/${id}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Foto no encontrada");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createFoto = createAsyncThunk(
  "fotos/create",
  async (payload, { rejectWithValue }) => {
    try {
      const isFormData = payload instanceof FormData;
      const headers = isFormData ? getAuthHeadersFormData() : getAuthHeaders();
      const body = isFormData ? payload : JSON.stringify(payload);

      const res = await fetch(`${fetchAutomatic()}/foto`, {
        method: "POST",
        headers,
        body,
      });
      if (!res.ok) throw new Error("Error creando foto");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteFoto = createAsyncThunk(
  "fotos/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${fetchAutomatic()}/foto/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Error eliminando foto");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  fotos: [],
  fotoActual: null,
  loading: false,
  error: null,
  success: false,
};

const fotoSlice = createSlice({
  name: "fotos",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearFotoActual: (state) => {
      state.fotoActual = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFotos.fulfilled, (state, action) => {
        state.loading = false;
        state.fotos = action.payload;
      })
      .addCase(fetchFotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFotoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFotoById.fulfilled, (state, action) => {
        state.loading = false;
        state.fotoActual = action.payload;
      })
      .addCase(fetchFotoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createFoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFoto.fulfilled, (state, action) => {
        state.loading = false;
        state.fotos.push(action.payload);
        state.success = true;
      })
      .addCase(createFoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFoto.fulfilled, (state, action) => {
        state.loading = false;
        state.fotos = state.fotos.filter((f) => f.id !== action.meta.arg);
        state.success = true;
      })
      .addCase(deleteFoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, clearFotoActual } = fotoSlice.actions;
export default fotoSlice.reducer;
