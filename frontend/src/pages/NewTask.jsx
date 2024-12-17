import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios"; // Ajusta la ruta si es necesario
import TaskForm from "../components/TaskForm";

export default function NewTask() {
  const { projectID } = useParams();
  const navigate = useNavigate();
  const { axiosPost, posting, errors } = useAxios();

  async function handleSubmit(e, task) {
    e.preventDefault();
    const response = await axiosPost("http://localhost:8080/api/tasks", {
      task: {
        ...task,
        projectId: projectID,
      },
    });
    if (response.status == 200) {
      navigate("/admin-tasks/" + projectID);
    }
  }

  return (
    <section className="py-20 min-h-screen">
      <div className="px-6">
        <h1 className="text-2xl font-medium mb-6">Nueva tarea</h1>
        <TaskForm
          handleSubmit={handleSubmit}
          errors={errors}
          posting={posting}
        />
      </div>
    </section>
  );
}
