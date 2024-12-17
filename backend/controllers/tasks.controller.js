import tasksService from "../services/tasks.service.js";

const tasksController = {
  async getTasksByProject(req, res) {
    try {
      const response = await tasksService.getTasksByProject(req);
      res.status(response.status).json(response);
    } catch (e) {
      console.log("Error obteniendo las tareas:", e);
      res.status(500).json({ error: "Error obteniendo las tareas" });
    }
  },

  async deleteTask(req, res) {
    try {
      const response = await tasksService.deleteTask(req);
      res.status(response.status).json(response);
    } catch (e) {
      console.log("Error eliminando la tarea:", e);
      res.status(500).json({ error: "Error eliminando la tarea" });
    }
  },

  async createTask(req, res) {
    try {
      const response = await tasksService.createTask(req);
      res.status(response.status).json(response);
    } catch (e) {
      console.log("Error creando la tarea:", e);
      res.status(500).json({ error: "Error creando la tareas" });
    }
  },

  async markAsCompleted(req, res) {
    try {
      const response = await tasksService.markAsCompleted(req);
      res.status(response.status).json(response);
    } catch (e) {
      console.log("Error actualizando la tarea:", e);
      res.status(500).json({ error: "Error actualizando la tarea" });
    }
  },
};

export default tasksController;
