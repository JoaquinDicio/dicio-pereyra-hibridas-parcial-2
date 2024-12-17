import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useParams, Link } from "react-router-dom";
import TasksList from "../components/TasksList";

export default function Tasks() {
  const { axiosGet, loading } = useAxios();
  const { projectID } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getProjectTasks() {
      const response = await axiosGet(
        `http://localhost:8080/api/tasks/${projectID}`
      );

      if (response.status == 200) {
        setTasks(response.data);
      }
    }

    getProjectTasks();
  }, []);

  return (
    <section className="py-20 min-h-screen">
      <div className="px-6">
        <h1 className="text-2xl font-medium mb-6">Tareas del proyecto</h1>
        <Link
          to={`/add-task/${projectID}`}
          className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 duration-75 rounded"
        >
          Agregar tarea
        </Link>
        <TasksList setTasks={setTasks} tasks={tasks} loading={loading} />
      </div>
    </section>
  );
}
