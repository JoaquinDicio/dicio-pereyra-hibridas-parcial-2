import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx"; // Asegúrate de usar tu contexto

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
        <header className="fixed top-0 bg-slate-200 flex justify-between px-5 py-3 w-full">
          <Link to={"/"}>ProjectHub</Link>
          <div className="flex gap-3">
            <Link to={`/profile/${user._id}`}>{user?.username}</Link>
            <button onClick={logout} className="text-red-500 text-sm">
              Cerrar sesion
            </button>
          </div>
        </header>
        <Page />
      </>
    );
};

export default PrivateRoute;
