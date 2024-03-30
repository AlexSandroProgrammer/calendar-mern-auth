import { createSlice } from "@reduxjs/toolkit";

// creamos un nuevo slice
export const authSlice = createSlice({
  // su nombre ui de acuerdo al uso que le vamos a dar
  name: "auth",
  // creamos un estado inicial
  initialState: {
    status: "checking",
    user: {},
    errorMessage: undefined,
  },
  // creamos las reducers que seran las que despacharemos en cada estado diferente de la aplicacion
  reducers: {
    // creamos un reducer el cual se encargara de poner al usuario en estado
    // de chequeo ya que no esta no esta autenticado
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = "autenthicated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

// exportacion de los reducers
export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;
