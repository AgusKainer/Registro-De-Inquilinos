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

export const createReparacion = createAsyncThunk(
  "reparaciones/create",
  async (payload, { rejectWithValue }) => {
    try {
      const isFormData = payload instanceof FormData;
      const headers = isFormData ? getAuthHeadersFormData() : getAuthHeaders();
      const body = isFormData ? payload : JSON.stringify(payload);

      const res = await fetch(`${fetchAutomatic()}/reparacion`, {
        method: "POST",
        headers,
        body,
      });
      if (!res.ok) throw new Error("Error creando reparación");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  reparaciones: [],
  loading: false,
  error: null,
  success: false,
};

const reparacionSlice = createSlice({
  name: "reparaciones",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReparacion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReparacion.fulfilled, (state, action) => {
        state.loading = false;
        state.reparaciones.push(action.payload);
        state.success = true;
      })
      .addCase(createReparacion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = reparacionSlice.actions;
export default reparacionSlice.reducer;
