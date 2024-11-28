import ProjectsList from "../components/ProjectsList";
import CategorySelector from "../components/CategorySelector.jsx";
import useAxios from "../hooks/useAxios.jsx";
import { useEffect, useState } from "react";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const { axiosGet, loading, errors } = useAxios();

  useEffect(() => {
    async function getProjects() {
      const data = await axiosGet("http://localhost:8080/api/projects");
      setFilteredProjects(data.projects || null); // siempre se pasa este array para el render
      setProjects(data.projects || null); // este es para recuperar los datos originales
    }
    getProjects();
  }, []);

  function handleCategoryChange(target) {
    const selected = target.value;
    // en caso de que no se seleccione ninguna
    if (selected == "none") {
      setFilteredProjects(projects);
      return;
    }
    //filtra si hay una seleccionada
    const result = projects.filter(
      (project) => project.category?._id == selected
    );
    setFilteredProjects(result);
  }

  return (
    <section className="pt-12 px-5 bg-slate-50 h-screen">
      <div className="py-5">
        <h2 className="text-xl font-medium">Proyectos</h2>
        <div className="pt-5">
          <CategorySelector setCategory={handleCategoryChange} />
        </div>
        <ProjectsList
          projects={filteredProjects}
          loading={loading}
          errors={errors}
        />
      </div>
    </section>
  );
}
