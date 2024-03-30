import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {
  // realizamos la importacion del metodo para realizar validacion del token
  const { status, checkAuthToken } = useAuthStore();
  // cuando se este recargando la aplicacion, realizamos el chequeo del token
  useEffect(() => {
    checkAuthToken();
  }, []);

  // si la aplicacion esta en checking entonces creamos una condicional el cual retorne un
  // mensaje de carga
  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        // creamos un fragmento
        <>
          (<Route path="/auth/*" element={<LoginPage />} />)
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          (<Route path="/" element={<CalendarPage />} />)
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}

      {/** si el usuario no esta autenticado entonces lo redireccionamos al login  */}
    </Routes>
  );
};
