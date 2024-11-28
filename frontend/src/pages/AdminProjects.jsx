import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../context/authContext";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const { axiosGet, axiosDelete, posting, loading, errors } = useAxios();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function getProjects() {
      const response = await axiosGet(
        `http://localhost:8080/api/users/${user._id}/projects`
      );
      if (response.status == 200) setProjects(response.projects);
    }
    getProjects();
  }, []);

  async function handleDelete(projectID) {
    const response = await axiosDelete(
      `http://localhost:8080/api/projects/${projectID}`
    );

    // si la solicitud fue exitosa lo elimina del array
    if (response.status == 200)
      setProjects(projects.filter((project) => project._id !== projectID));
  }

  // si esta cargando renderiza esto
  if (loading && projects.length == 0) {
    return (
      <section className="pt-20 px-6 bg-gray-100 flex items-center justify-center h-screen">
        <i className="text-xl">Cargando proyectos...</i>
      </section>
    );
  }
  return (
    <section className="pt-20 px-6 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Lista de Proyectos
      </h1>
      {projects.length === 0 ? (
        <p className="text-gray-600">No hay proyectos disponibles.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li
              key={project._id}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {project.name}
                </h2>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Link
                  to={`/admin-contributors/${project._id}`}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Contribuidores
                </Link>
                <Link to={`/edit-project/${project._id}`}>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    Editar
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
