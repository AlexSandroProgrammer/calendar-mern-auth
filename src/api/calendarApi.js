// import axios
import axios from "axios";
// import variables of enviroment
import { getEnvVariables } from "../helpers";
// import variables of environment
const { BACKEND_API_URL } = getEnvVariables();

// creamos la instancia de axios para configurar el endpoint principal
const calendarApi = axios.create({
  baseURL: BACKEND_API_URL,
});

// TODO: Configuracion de Interceptores

//* creamos un interceptor que se encargara de poner al usuario en estado de checking
calendarApi.interceptors.request.use((config) => {
  // si el usuario esta logueado el token se agregara a los headers y estara presente
  // en cada peticion que hagamos
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };
  // hacemos el retorno de la configuracion agregando el token a la configuracion
  // de los headers
  return config;
});

//* export calendarApi
export default calendarApi;
