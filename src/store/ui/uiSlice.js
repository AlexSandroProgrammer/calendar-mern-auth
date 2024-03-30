import { createSlice } from "@reduxjs/toolkit";

// creamos un nuevo slice
export const uiSlice = createSlice({
  // su nombre ui de acuerdo al uso que le vamos a dar
  name: "ui",
  // creamos un estado inicial
  initialState: {
    isDateModalOpen: false,
  },
  // creamos las reducers que seran las que despacharemos en cada estado diferente de la aplicacion
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    },
  },
});

// exportacion de los reducers
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
