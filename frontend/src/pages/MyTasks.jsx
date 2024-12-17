import { AuthContext } from "../context/authContext";
import { useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import TasksList from "../components/TasksList";

export default function MyTasks() {
  const { user } = useContext(AuthContext);
  const { axiosGet, loading, errors } = useAxios();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getTasks() {
      const response = await axiosGet(
        `http://localhost:8080/api/users/${user._id}/tasks`
      );
      if (response.status == 200) {
        setTasks(response.data);
      }
    }
    getTasks();
  }, []);

  return (
    <section className="py-20 min-h-screen">
      <div className="px-6">
        <h1 className="text-2xl font-medium mb-6">Mis tareas</h1>
        <TasksList tasks={tasks} loading={loading} setTasks={setTasks} />
      </div>
    </section>
  );
}
