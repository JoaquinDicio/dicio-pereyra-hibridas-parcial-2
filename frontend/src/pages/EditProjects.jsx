import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { useParams, useNavigate } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";

export default function EditProject() {
  const navigate = useNavigate();
  const { projectID } = useParams();
  const { errors, loading, axiosGet, axiosPut, posting } = useAxios();
  const [projectDetails, setProjectDetails] = useState({});

  // obteiene los datos del proyecto a actualizar
  useEffect(() => {
    async function fetchProjectDetails() {
      const response = await axiosGet(
        `http://localhost:8080/api/projects/${projectID}`
      );
      if (response.status == 200) setProjectDetails(response.project);
    }
    fetchProjectDetails();
  }, [projectID]);

  async function handleSubmit(e, projectDetails) {
    e.preventDefault();
    const response = await axiosPut(
      `http://localhost:8080/api/projects/${projectID}`,
      { newData: projectDetails }
    );

    if (response?.status == 200) {
      navigate("/admin-projects"); // si tod o salio bien vuelve al admin
    }
  }

  return (
    <section className="p-20">
      <h1 className="text-2xl">Editar Proyecto</h1>
      {loading ? (
        <i>Obteniendo datos...</i>
      ) : (
        <ProjectForm
          handleSubmit={handleSubmit}
          errors={errors}
          posting={posting}
          oldData={projectDetails}
        />
      )}
    </section>
  );
}
