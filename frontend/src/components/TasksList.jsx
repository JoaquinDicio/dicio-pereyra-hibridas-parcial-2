import useAxios from "../hooks/useAxios";

export default function TasksList({ tasks, loading, setTasks }) {
  const { axiosPut, axiosDelete, posting } = useAxios();

  async function handleDelete(id) {
    if (posting) return; //para evitar multiples soliciutdes
    const response = await axiosDelete(`http://localhost:8080/api/tasks/${id}`);
    if (response.status == 200) {
      setTasks(tasks.filter((task) => task._id != id));
    }
  }

  async function handleComplete(id) {
    await axiosPut(`http://localhost:8080/api/tasks/${id}`);
    const updated = tasks.map((task) =>
      task._id == id ? { ...task, completed: true } : task
    );
    setTasks(updated);
  }
  return (
    <ul className="mt-10 flex flex-col gap-3">
      {loading && <i className="text-center">Cargando...</i>}
      {tasks.length == 0 && !loading && <i>No hay tareas pendientes</i>}
      {tasks.map((task) => (
        <li
          key={task._id}
          className="flex items-center justify-between bg-gray-100 shadow-md rounded-lg p-4 hover:bg-gray-200 transition"
        >
          <div
            className={
              task.completed ? "text-decoration-line line-through" : ""
            }
          >
            <p className="text-lg font-medium text-gray-800">{task.name}</p>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p className="text-sm mt-2">
              <b>Proyecto:</b> {task.projectId.name}
            </p>
          </div>
          <div className="flex gap-2">
            {!task.completed && (
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
                onClick={() => handleComplete(task._id)}
              >
                Completar
              </button>
            )}
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
              onClick={() => handleDelete(task._id)}
            >
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
