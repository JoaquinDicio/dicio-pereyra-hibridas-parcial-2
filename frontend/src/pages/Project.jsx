import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import CommentsBox from "../components/CommentsBox";

export default function Project() {
  const { projectID } = useParams();
  const { axiosGet, loading, errors } = useAxios();
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    async function fetchProjectDetails() {
      const response = await axiosGet(
        `http://localhost:8080/api/projects/${projectID}`
      );
      if (response?.ok) {
        setProjectData(response.project);
      }
    }
    fetchProjectDetails();
  }, [projectID]);

  if (loading) {
    return (
      <section className="flex items-center justify-center h-screen">
        <p>Cargando detalles del proyecto...</p>
      </section>
    );
  }

  if (!projectData) {
    return (
      <section className="flex items-center justify-center h-screen">
        <p>No se encontraron datos del proyecto</p>
      </section>
    );
  }

  const { contributors, comments } = projectData;

  return (
    <section className="py-20 px-6">
      <h1 className="text-3xl font-bold mb-4">{projectData?.name}</h1>
      <p className="text-sm mb-6 text-gray-500">
        {projectData.category?.name ? (
          <>Categoría: {projectData.category.name}</>
        ) : (
          <i>Sin categoría</i>
        )}
      </p>
      <img
        src={projectData?.img_url}
        alt={projectData?.name}
        className="w-full h-60 object-cover mb-4"
      />
      <p className="text-gray-700 mt-6">{projectData?.longDescription}</p>
      <p className="text-sm text-gray-500 mt-2">
        Creado por: {projectData.userId?.username}
      </p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Contribuidores</h2>
        {contributors?.length > 0 ? (
          <ul className="space-y-2">
            {contributors.map((contributor) => (
              <li
                key={contributor._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span className="font-medium">
                  {contributor.userId.username}
                </span>
                <span className="text-sm text-gray-500">
                  {contributor.userId.email}
                </span>
                <span className="text-sm text-gray-600">
                  {contributor.role}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            No hay contribuyentes en este proyecto.
          </p>
        )}
      </div>
      <CommentsBox comments={comments} />
    </section>
  );
}
