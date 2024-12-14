import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { useParams, Link } from "react-router-dom";
import ProjectsList from "../components/ProjectsList.jsx";
import useAxios from "../hooks/useAxios.jsx";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const { userID } = useParams(); //obtiene el parametro de la url
  const [userData, setUserData] = useState(null);
  const [ownerMode, setOwnerMode] = useState(false);
  const { axiosGet, loading, errors } = useAxios();

  useEffect(() => {
    async function getUserAndProjects() {
      const { projects, owner } = await axiosGet(
        `http://localhost:8080/api/users/${userID}/projects`
      );
      setUserData({ projects, ...owner });
    }
    getUserAndProjects();
  }, []);

  useEffect(() => {
    if (user._id == userID) {
      setOwnerMode(true);
    }
  }, [userID]);

  if (loading) {
    return (
      <section className="pt-20 px-10 flex flex-col items-center h-screen justify-center">
        <i className="pb-5 text-xl">Cargando perfil...</i>
      </section>
    );
  }

  if (!userData && !loading) {
    // si no hay data y ya termino de cargar quiere decir que no se encnotro el user
    return (
      <section className="pt-20 px-10 flex flex-col items-center justify-center">
        <i className="pb-5 text-xl">No existe el usuario especificado</i>
        <Link to={"/"} className="text-sm text-blue-500">
          Ir al home
        </Link>
      </section>
    );
  }

  // si esta todo mostramos el componente completo
  return (
    <section className="py-20 px-10">
      <p className="text-2xl font-medium">{userData?.username}</p>
      <i>Se unió el {userData?.createdAt.split("T")[0]}</i>
      <div className="pt-10">
        <h2 className="text-xl">Proyectos del usuario</h2>
        {ownerMode && (
          <div className="flex gap-3 mt-5">
            <Link
              to={"/new/project"}
              className="rounded cursor-pointer px-3 py-2 bg-green-600 hover:bg-green-700 text-white"
            >
              Agregar proyecto
            </Link>
            <Link
              to={"/admin-projects"}
              className="rounded cursor-pointer px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              Administrar proyectos
            </Link>
            <Link
              to={`/profile/edit`}
              className="rounded cursor-pointer px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Editar perfil
            </Link>
          </div>
        )}
        <ProjectsList projects={userData?.projects} />
      </div>
    </section>
  );
}
