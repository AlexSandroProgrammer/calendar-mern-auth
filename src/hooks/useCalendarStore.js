import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadingEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
import { calendarApi } from "../api";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  // */ variable para despachar cada uno de los metodos
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  // metodo para colocar un evento activo en el modal
  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  // creamos una funcion para actualizar o crear el evento
  const startSavingEvent = async (calendarEvent) => {
    // respuesta del backend

    // si todo sale bien hacemos una condicional para definir si vamos a crear o actualizar el evento
    try {
      // upateEvent
      if (calendarEvent.id) {
        //  Actualizamos el evento
        const { data } = await calendarApi.put(
          `/events/${calendarEvent.id}`,
          calendarEvent
        );
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      // si no recibe un id la prop entonces Creamos el evento
      // realizar la peticion al backend y obtenemos la respuesta
      const { data } = await calendarApi.post("/events/create", calendarEvent);
      //si todo sale guardamos el nuevo evento en el arreglo de eventos y agregamos los datos
      //del usuario logueado
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
    } catch (error) {
      console.log(error);
      // mostramos el mensaje al usuario de que hubo error al momento de guardar los datos
      Swal.fire(
        "Ups! Ocurrio un error",
        error.response?.data?.msg,
        "error" || "Error al momento de guardar los datos"
      );
    }
  };

  // creamos una funcion para cargar todos los eventos en el calendario
  const startLoadingEvents = async () => {
    try {
      // respuesta del backend
      const { data } = await calendarApi.get("/events/");
      // enviamos los eventos para proceder a formatear las fechas
      const events = convertEventToDate(data.events);
      // si todo sale bien cargamos los eventos en el store
      dispatch(onLoadingEvents(events));
    } catch (error) {
      // en caso de que haya algun error lo mostramos en consola
      console.error(error);
    }
  };

  // ! metoodo para borrar un calendario del evento
  const startDeletingEvent = async () => {
    // TODO: respuesta del backend
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      // mostramos el mensaje al usuario de que hubo error al momento de borrar los datos
      Swal.fire(
        "Ups! Ocurrio un error",
        error.response?.data?.msg,
        "error" || "Error al momento de borrar los datos"
      );
    }
  };

  return {
    // Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    // Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
