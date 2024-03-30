import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  clearErrorMessage,
  onChecking,
  onClearEvents,
  onLogin,
  onLogout,
} from "../store/";

export const useAuthStore = () => {
  // llamamos el slice de la auntenticacion mediante el useSelector
  const { status, errorMessage, user } = useSelector((state) => state.auth);
  // llamamos el metodo de despachar las acciones
  const dispatch = useDispatch();

  // creamos una funcion para hacer el dispatch del login
  const startLogin = async ({ email, password }) => {
    // ponemos la aplicacion en un estado de carga
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth", { email, password });
      // * almacemos el token en el localStorage
      localStorage.setItem("token", data.token);
      // almacenamos el tiempo en que se guardo el token
      localStorage.setItem("token-init-date", new Date().getTime());

      // despues de realizar el login del usuario
      // cambiamos el estado a autenticado despechando la accion de login
      // y almacenamos la data del usuario en el estado del user
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout("Las credenciales son incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 50);
    }
  };

  // creamos una funcion para realizar el registro del usuario
  const startRegister = async ({ email, password, name }) => {
    dispatch(onChecking());
    try {
      // realizamos el registro del usuario
      const { data } = await calendarApi.post("/auth/create", {
        email,
        password,
        name,
      });
      // * almacemos el token en el localStorage
      localStorage.setItem("token", data.token);
      // almacenamos el tiempo en que se guardo el token
      localStorage.setItem("token-init-date", new Date().getTime());

      // despues de realizar el login del usuario
      // cambiamos el estado a autenticado despechando la accion de login
      // y almacenamos la data del usuario en el estado del user
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(
        onLogout(
          error.response.data?.msg || "Error al momento de registrar al usuario"
        )
      );
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 50);
    }
  };

  // creamos una funcion para manejar la autenticacion mediante el token
  const checkAuthToken = async () => {
    // extraemos el token del localstorage
    const token = localStorage.getItem("token");
    //* si el token esta como undefiend o null hacemos el retorno del logout
    if (!token) {
      return dispatch(onLogout("El token ha expirado"));
    }
    // si se encuentra el token en el localStorage entonces realizamos la validacion
    // de que si no hay ningun error entonces procedemos a renovarlo
    try {
      // realizamos la renovacion del token mediante la ruta del backend para renovar el token
      const { data } = await calendarApi.get("/auth/renew");
      // si se realiza correctamente guardamos el token y la hora en que se registro el token
      // en el localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      // despues hacemos el despache de la accion para hacer el login del usuario
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout("El token ha expirado"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 50);
    }
  };

  // creamos una funcion para manejar el logout o cierre de sesion del usuario
  const startLogout = () => {
    // limpiamos todos los valores que hayamos guardado en el localStorage
    localStorage.clear();
    // despues limpiamos los eventos del calendario
    dispatch(onClearEvents());
    // despues hacemos el despache de la accion para hacer el logout del usuario
    dispatch(onLogout("Sesion cerrada"));
  };
  // exportacion de metodos y propiedades
  return {
    //* properties
    status,
    user,
    errorMessage,
    // * methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
