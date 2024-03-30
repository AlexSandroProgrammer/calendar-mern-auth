import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice, authSlice } from "./";

export const store = configureStore({
  reducer: {
    // Slice para autenticacion
    auth: authSlice.reducer,
    // Slice para eventos
    calendar: calendarSlice.reducer,
    // Slice para ui
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
