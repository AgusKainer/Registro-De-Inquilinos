import { configureStore } from "@reduxjs/toolkit";
import contratoReducer from "./slices/contratoSlice";
import inquilinoReducer from "./slices/inquilinoSlice";
import localReducer from "./slices/localSlice";
import fotoReducer from "./slices/fotoSlice";
import reparacionReducer from "./slices/reparacionSlice";

export const store = configureStore({
  reducer: {
    contratos: contratoReducer,
    inquilinos: inquilinoReducer,
    locales: localReducer,
    fotos: fotoReducer,
    reparaciones: reparacionReducer,
  },
});

export default store;
