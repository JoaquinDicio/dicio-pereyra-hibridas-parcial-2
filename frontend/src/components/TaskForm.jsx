import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";

export default function TaskForm({ handleSubmit, errors, posting }) {
  const { user } = useContext(AuthContext);
  const { projectID } = useParams();
  const { axiosGet, loading } = useAxios();
  const [contributors, setContributors] = useState([]);

  const [task, setTask] = useState({
    name: "",
    description: "",
    dueDate: "",
    userId: user._id,
  });

  // Obtener colaboradores del proyecto para mostrarlos en el select
  useEffect(() => {
    async function fetchContributors() {
      const response = await axiosGet(
        `http://localhost:8080/api/projects/${projectID}/contributors`
      );
      if (response.ok) setContributors(response.contributors);
    }

    fetchContributors();
  }, [projectID]);

  function handleChange(target) {
    const field = target.name;
    setTask((prev) => ({ ...prev, [field]: target.value }));
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e, task)}
      className="flex flex-col gap-2 max-w-[400px]"
    >
      <input
        className="border border-1 border-black p-1"
        name="name"
        type="text"
        placeholder="Nombre de la tarea"
        value={task.name}
        onChange={(e) => handleChange(e.target)}
        required
      />
      <i className="text-sm text-red-500">{errors?.name}</i>

      <textarea
        className="border border-1 border-black p-1"
        name="description"
        placeholder="Descripción de la tarea"
        value={task.description}
        onChange={(e) => handleChange(e.target)}
      />
      <i className="text-sm text-red-500">{errors?.description}</i>
      <label htmlFor="userId">Fecha vencimiento:</label>

      <input
        className="border border-1 border-black p-1"
        name="dueDate"
        type="date"
        placeholder="Fecha de vencimiento"
        value={task.dueDate}
        onChange={(e) => handleChange(e.target)}
      />
      <i className="text-sm text-red-500">{errors?.dueDate}</i>

      <label htmlFor="userId">Seleccionar usuario responsable:</label>
      <select
        className="border border-1 border-black p-1"
        name="userId"
        id="userId"
        value={task.userId}
        onChange={(e) => handleChange(e.target)}
        required
        disabled={loading || contributors.length === 0}
      >
        <option value={user._id}>Yo mismo</option>
        {contributors?.map((contributor) => (
          <option key={contributor._id} value={contributor._id}>
            {contributor.username}
          </option>
        ))}
      </select>
      <i className="text-sm text-red-500">{errors?.userId}</i>

      <input
        type="submit"
        value="Crear tarea"
        className="disabled:bg-slate-200 bg-blue-500 cursor-pointer hover:bg-blue-700 duration-75 text-white rounded-sm px-3 py-1"
        disabled={posting}
      />
    </form>
  );
}
