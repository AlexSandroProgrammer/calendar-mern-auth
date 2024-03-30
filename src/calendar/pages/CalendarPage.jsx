import { useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns";
import {
  NavBar,
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from "../";
import { localizer, getMessages } from "../../helpers";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";
// creamos el evento

export const CalendarPage = () => {
  // nos traemos los datos de los usuarios autenticados
  const { user } = useAuthStore();
  // propiedades y metodos del modal
  const { openDateModal } = useUiStore();
  // evento importado desde el custom hook para el calendar store
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  // creamos un estado para guardar la ultima vista
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    // verificamos de que si el evento no le pertenece al usuario entonces
    // le colocamos otro color al evento

    // como la libreria de big-calendar nos devuelve otro formato de id entonces
    // creamos las dos instancias
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;
    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    openDateModal();
  };
  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    // capturamos el evento que recibimos y lo almacenamos en el LocalStorage
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <NavBar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessages()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
