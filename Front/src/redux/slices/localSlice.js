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

export const fetchLocales = createAsyncThunk(
  "locales/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${fetchAutomatic()}/local`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Error obteniendo locales");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchLocalById = createAsyncThunk(
  "locales/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${fetchAutomatic()}/local/${id}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Local no encontrado");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createLocal = createAsyncThunk(
  "locales/create",
  async (payload, { rejectWithValue }) => {
    try {
      const isFormData = payload instanceof FormData;
      const headers = isFormData ? getAuthHeadersFormData() : getAuthHeaders();
      const body = isFormData ? payload : JSON.stringify(payload);

      const res = await fetch(`${fetchAutomatic()}/local`, {
        method: "POST",
        headers,
        body,
      });
      if (!res.ok) throw new Error("Error creando local");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateLocal = createAsyncThunk(
  "locales/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const isFormData = data instanceof FormData;
      const headers = isFormData ? getAuthHeadersFormData() : getAuthHeaders();
      const body = isFormData ? data : JSON.stringify(data);

      const res = await fetch(`${fetchAutomatic()}/local/${id}`, {
        method: "PUT",
        headers,
        body,
      });
      if (!res.ok) throw new Error("Error actualizando local");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteLocal = createAsyncThunk(
  "locales/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${fetchAutomatic()}/local/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Error eliminando local");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  locales: [],
  localActual: null,
  loading: false,
  error: null,
  success: false,
};

const localSlice = createSlice({
  name: "locales",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearLocalActual: (state) => {
      state.localActual = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocales.fulfilled, (state, action) => {
        state.loading = false;
        state.locales = action.payload;
      })
      .addCase(fetchLocales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLocalById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocalById.fulfilled, (state, action) => {
        state.loading = false;
        state.localActual = action.payload;
      })
      .addCase(fetchLocalById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createLocal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLocal.fulfilled, (state, action) => {
        state.loading = false;
        state.locales.push(action.payload);
        state.success = true;
      })
      .addCase(createLocal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLocal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLocal.fulfilled, (state, action) => {
        state.loading = false;
        state.localActual = action.payload;
        const idx = state.locales.findIndex((l) => l.id === action.payload.id);
        if (idx !== -1) state.locales[idx] = action.payload;
        state.success = true;
      })
      .addCase(updateLocal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteLocal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLocal.fulfilled, (state, action) => {
        state.loading = false;
        state.locales = state.locales.filter((l) => l.id !== action.meta.arg);
        state.success = true;
      })
      .addCase(deleteLocal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, clearLocalActual } =
  localSlice.actions;
export default localSlice.reducer;
