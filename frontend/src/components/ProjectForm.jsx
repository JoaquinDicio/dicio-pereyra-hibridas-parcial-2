import CategorySelector from "./CategorySelector";
import { useState, useEffect } from "react";

export default function ProjectForm({
  handleSubmit,
  posting,
  errors,
  oldData,
}) {
  const emptyProject = {
    name: "",
    description: "",
    longDescription: "",
    repo: "",
    img_url: "",
    category: "",
  };

  const [projectDetails, setProjectDetails] = useState(oldData || emptyProject);

  function handleChange(target) {
    setProjectDetails((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, projectDetails)} className="my-4">
      <div className="flex flex-col gap-2 max-w-[400px]">
        <input
          className="border border-1 border-black p-1"
          value={projectDetails.name}
          onChange={(e) => handleChange(e.target)}
          type="text"
          placeholder="Nombre del proyecto"
          name="name"
          required
        />
        <i className="text-red-500 text-sm">{errors?.name}</i>

        <textarea
          className="border border-1 border-black p-1"
          value={projectDetails.description}
          onChange={(e) => handleChange(e.target)}
          placeholder="Descripción breve"
          name="description"
          rows="2"
          required
        />
        <i className="text-red-500 text-sm">{errors?.description}</i>

        <textarea
          className="border border-1 border-black p-1"
          value={projectDetails.longDescription}
          onChange={(e) => handleChange(e.target)}
          placeholder="Descripción larga (opcional)"
          name="longDescription"
          rows="3"
        />

        <input
          className="border border-1 border-black p-1"
          value={projectDetails.repo}
          onChange={(e) => handleChange(e.target)}
          type="text"
          placeholder="Repositorio (URL)"
          name="repo"
          required
        />
        <i className="text-red-500 text-sm">{errors?.repo}</i>

        <input
          className="border border-1 border-black p-1"
          value={projectDetails.img_url}
          onChange={(e) => handleChange(e.target)}
          type="text"
          placeholder="Imagen (URL)"
          name="img_url"
          required
        />
        <i className="text-red-500 text-sm">{errors?.img_url}</i>

        <CategorySelector
          setCategory={handleChange}
          selectedCategory={projectDetails.category}
        />

        <i className="text-red-500 text-sm">{errors?.category}</i>

        <input
          value="Guardar"
          type="submit"
          className="disabled:bg-slate-200 bg-blue-500 cursor-pointer hover:bg-blue-700 duration-75 text-white rounded-sm px-3 py-1"
          disabled={posting}
        />
      </div>
    </form>
  );
}
