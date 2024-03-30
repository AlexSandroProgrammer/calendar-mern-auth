import { createSlice } from "@reduxjs/toolkit";

// const tempEvent = {
//   _id: new Date().getTime(),
//   title: "crud con mern",
//   notes: "estamos haciendo un crud con react y node",
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: "#fafafa",
//   user: {
//     _id: "123",
//     name: "Usuario",
//   },
// };

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoading: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    // reducer para agregar un evento
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    // reducer para actualizar un evento
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    // reducer para colocar un evento activo en el modal
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },

    // reducer para borrar un evento
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },

    // reducer para hacer limpieza de los eventos
    onClearEvents: (state) => {
      state.isLoading = true;
      state.events = [];
      state.activeEvent = null;
    },

    // reducer para cargar los eventos
    onLoadingEvents: (state, { payload }) => {
      state.isLoading = false;
      // antes de cargar los eventos necesitamos hacer una validacion
      // de que si el evento con ese id ya esta cargado entonces no quiero que lo vuelva a cargar nuevamente
      // esto nos ayuda para no replicar la información
      payload.forEach((event) => {
        const EventisExist = state.events.some(eventDatabase.id === event.id);
        if (!EventisExist) {
          state.events.push(event);
        }
      });
    },
  },
});

export const {
  onAddNewEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadingEvents,
  onClearEvents,
} = calendarSlice.actions;
