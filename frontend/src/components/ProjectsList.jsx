import ProjectCard from "./ProjectCard";

export default function ProjectsList({ projects, loading, errors }) {
  return (
    <div>
      <ul className="flex mt-10 flex-wrap gap-5">
        {loading && <p>Cargando proyectos...</p>}
        {projects?.map((project) => (
          <ProjectCard
            key={project._id}
            img_url={project.img_url}
            projectID={project._id}
            name={project.name}
            description={project.description}
          />
        ))}
        {projects?.length == 0 && !loading && (
          <i>No hay proyectos para mostrar</i>
        )}
        {errors && <i>Ha ocurrido un error en el servidor</i>}
      </ul>
    </div>
  );
}
