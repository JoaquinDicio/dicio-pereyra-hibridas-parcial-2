import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";

export default function NewProject() {
  const { errors, posting, axiosPost } = useAxios();
  const navigate = useNavigate();

  async function handleSubmit(e, projectDetails) {
    e.preventDefault();
    const response = await axiosPost("http://localhost:8080/api/projects", {
      project: projectDetails,
    });

    if (response.status == 200) {
      navigate("/admin-projects");
    }
  }

  return (
    <section className="p-20">
      <h1 className="text-2xl">Agregar Proyecto</h1>
      <ProjectForm
        handleSubmit={handleSubmit}
        errors={errors}
        posting={posting}
      />
    </section>
  );
}
