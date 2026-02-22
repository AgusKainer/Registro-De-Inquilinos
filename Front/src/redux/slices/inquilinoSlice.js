import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAutomatic } from "../api";

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

export const fetchInquilinos = createAsyncThunk(
  "inquilinos/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${fetchAutomatic()}/inquilino`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Error obteniendo inquilinos");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createInquilino = createAsyncThunk(
  "inquilinos/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${fetchAutomatic()}/inquilino`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error creando inquilino");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteInquilino = createAsyncThunk(
  "inquilinos/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${fetchAutomatic()}/inquilino/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Error eliminando inquilino");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  inquilinos: [],
  loading: false,
  error: null,
  success: false,
};

const inquilinoSlice = createSlice({
  name: "inquilinos",
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
      .addCase(fetchInquilinos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInquilinos.fulfilled, (state, action) => {
        state.loading = false;
        state.inquilinos = action.payload;
      })
      .addCase(fetchInquilinos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createInquilino.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInquilino.fulfilled, (state, action) => {
        state.loading = false;
        state.inquilinos.push(action.payload);
        state.success = true;
      })
      .addCase(createInquilino.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteInquilino.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInquilino.fulfilled, (state, action) => {
        state.loading = false;
        state.inquilinos = state.inquilinos.filter(
          (i) => i.id !== action.meta.arg,
        );
        state.success = true;
      })
      .addCase(deleteInquilino.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = inquilinoSlice.actions;
export default inquilinoSlice.reducer;
