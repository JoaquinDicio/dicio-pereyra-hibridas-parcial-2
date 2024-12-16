import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx"; // Asegúrate de usar tu contexto
import PrivateHeader from "./PrivateHeader.jsx";

const PrivateRoute = ({ Page }) => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // cada vez q cambia el estado global de autenticacion, vuelve a chequear
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  // si esta autenticado retorna la pagina privada
  if (isAuthenticated)
    return (
      <>
        <PrivateHeader />
        <Page />
      </>
    );
};

export default PrivateRoute;
