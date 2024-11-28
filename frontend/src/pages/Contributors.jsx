import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import ContributorsBar from "../components/ContributorsBar";

export default function Contributors() {
  const { projectID } = useParams();
  const { axiosGet, axiosPost, posting, axiosDelete, loading, errors } =
    useAxios();
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    async function getContributors() {
      const response = await axiosGet(
        `http://localhost:8080/api/projects/${projectID}/contributors`
      );

      if (response.status == 200) {
        setContributors(response.contributors);
      }
    }
    getContributors();
  }, []);

  async function handleSubmit(e, userEmail) {
    e.preventDefault();

    const response = await axiosPost(
      `http://localhost:8080/api/projects/${projectID}/contributors`,
      { contributor: { email: userEmail } }
    );

    if (response.status == 200) {
      setContributors((prev) => [...prev, { ...response.contributor }]);
    }
  }

  async function handleDelete(contributorID) {
    const response = await axiosDelete(
      `http://localhost:8080/api/projects/${projectID}/contributors/${contributorID}`
    );

    if (response.status == 200) {
      setContributors((prev) =>
        prev.filter((contributor) => contributor._id !== contributorID)
      );
    }
  }

  return (
    <section className="py-20 min-h-screen">
      <div className="px-6">
        <h1 className="text-2xl font-medium mb-6">
          Contribuidores del proyecto
        </h1>
        <i className="text-red-500 mb-10">{errors?.msg}</i>
        {loading ? (
          <p className="text-gray-500">Cargando contribuyentes...</p>
        ) : contributors.length == 0 ? (
          <p className="text-gray-500">Este proyecto no tiene contribuyentes</p>
        ) : (
          <ul className="space-y-4 max-h-[50vh] overflow-y-scroll">
            {contributors.map((contributor) => (
              <li
                key={contributor._id}
                className="flex items-center justify-between bg-gray-100 shadow-md rounded-lg p-4 hover:bg-gray-200 transition"
              >
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    {contributor.username}
                  </p>
                  <p className="text-sm text-gray-600">{contributor.email}</p>
                </div>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                  onClick={() => handleDelete(contributor._id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ContributorsBar handleSubmit={handleSubmit} />
    </section>
  );
}
