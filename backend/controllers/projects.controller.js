import projectsService from "../services/projects.service.js";

const projectsController = {
  async createProject(req, res) {
    try {
      const response = await projectsService.createProject(req);
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: "Error creando el proyecto" });
      console.log("Error creando el proyecto:", e);
    }
  },

  async deleteProject(req, res) {
    try {
      const response = await projectsService.deleteProject(req);
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: "Error eliminando el proyecto" });
      console.log("Error eliminando el proyecto", e);
    }
  },

  async getAllProjects(req, res) {
    try {
      const response = await projectsService.getAllProjects();
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: "Error obteniendo los proyectos" });
      console.log("Error obteniendo los proyectos:", e);
    }
  },

  async getProjectById(req, res) {
    try {
      const response = await projectsService.getProjectById(req);
      res.status(response.status).json(response);
    } catch (e) {
      res
        .status(500)
        .json({ error: "Error obteniendo la informacion del proyecto" });
      console.log("Error obteniendo el proyecto:", e);
    }
  },

  async updateProject(req, res) {
    try {
      const response = await projectsService.updateProject(req);
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: "Error actualizando la informacion" });
      console.log("Error actualizando la información:", e);
    }
  },
};

export default projectsController;
