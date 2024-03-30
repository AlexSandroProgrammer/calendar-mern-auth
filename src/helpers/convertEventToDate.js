import { parseISO } from "date-fns";

export const convertEventToDate = (events = []) => {
  // hacemos un mapeo de todos los eventos y cambiamos las fechas individualment
  return events.map((event) => {
    // cambiamos el dato de fecha inicial de string a tipo fecha
    event.start = parseISO(event.start);
    // cambiamos el dato de fecha final de string a tipo fecha
    event.end = parseISO(event.end);

    return event;
  });
};
