import Project from "../models/Project.js";
import Contributor from "../models/Contributor.js";
import Comment from "../models/Comment.js";

const projectsService = {
  async createProject(req) {
    const { project } = req.body;
    const userId = req.user._doc._id; // esto viene gracias al token

    const required = ["name", "description", "repo", "img_url"];
    const errors = {};

    // verificacion de los errores y campos vacios
    required.forEach((key) => {
      if (!project[key] || project[key]?.trim() == "") {
        errors[key] = `El campo es obligatorio`; // si el campo requrido esta vacio lo agrega a errors
      }
    });

    const withErrors = Object.keys(errors).length > 0; // mira si errors esta vacio

    if (withErrors) {
      return { status: 400, errors, ok: false };
    }

    // si no hay errores agregamos el registro con los datos
    const newProject = await Project.create({
      ...project,
      userId,
    });

    return { status: 200, project: newProject, ok: true };
  },

  async deleteProject(req) {
    const { projectID } = req.params;

    const deleted = await Project.findByIdAndDelete(projectID);

    if (deleted) {
      return { status: 200, deleted: { ...deleted }, ok: true };
    }

    return {
      status: 404,
      error: "No existe proyecto con el ID especificado",
      ok: false,
    };
  },

  async getAllProjects() {
    const projects = await Project.find()
      .populate({
        path: "userId",
        select: "username",
      })
      .populate({
        path: "category",
        select: "name",
      });

    if (projects.length > 0) {
      return { status: 200, projects, ok: true };
    }

    return { status: 404, message: "No se encontraron proyectos", ok: false };
  },

  async getProjectById(req) {
    const { projectID } = req.params;

    const project = await Project.findById(projectID)
      .populate("userId", "username") // trae info del creador
      .populate("category", "name"); // trae info de la categoria

    if (!project) {
      return {
        status: 404,
        error: "El proyecto especificado no existe",
        ok: false,
      };
    }

    //busca los contribuidores del proyecto
    const contributors = await Contributor.find({
      projectId: projectID,
    }).populate("userId", "username email");

    // trae los comentarios relacionados
    const comments = await Comment.find({ projectId: projectID }).populate(
      "userId",
      "username email"
    );

    return {
      status: 200,
      ok: true,
      project: {
        ...project._doc,
        contributors,
        comments,
      },
    };
  },

  async updateProject(req) {
    const { projectID } = req.params;
    const { newData } = req.body; //debe llegar la data envuelta en un objeto newData
    const required = ["name", "description", "repo", "img_url"];
    const errors = {};

    required.forEach((key) => {
      if (!newData[key] || newData[key]?.trim() == "") {
        errors[key] = `El campo es obligatorio`;
      }
    });

    if (Object.keys(errors).length > 0) {
      return { status: 400, errors, ok: false };
    }

    // retorna el proyecto actualizado
    const updatedProject = await Project.findByIdAndUpdate(projectID, newData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return {
        status: 404,
        error: "No existe el proyecto especificado",
        ok: false,
      };
    }

    return { status: 200, updated: updatedProject, ok: true };
  },
};

export default projectsService;
