// objeto en el cual recibe las propiedades
import { dateFnsLocalizer } from "react-big-calendar";
// objeto que contiene los metodos para trabajar con react-big-calendar
import { format, parse, startOfWeek, getDay } from "date-fns";

// configuracion del lenguaje
import esES from "date-fns/locale/es";

const locales = {
  es: esES,
};

// exportacion del objeto que contiene los metodos con el que se construiran los eventos en el calendario

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
