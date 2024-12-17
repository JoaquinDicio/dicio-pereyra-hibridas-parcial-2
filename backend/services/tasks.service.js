import Task from "../models/Task.js";
import Project from "../models/Project.js";

const tasksService = {
  async getTasksByProject(req) {
    try {
      const projectId = req.params.projectId;
      const tasks = await Task.find({ projectId })
        .populate("userId", "username email")
        .populate("projectId", "name description")
        .exec();

      return {
        status: 200,
        data: tasks,
      };
    } catch (error) {
      console.error("Error obteniendo tareas:", error);
      return {
        status: 500,
        error: "Error obteniendo las tareas",
      };
    }
  },

  async createTask(req) {
    try {
      const { task } = req.body;
      const { name, description, dueDate, completed, projectId, userId } = task;
      const required = ["name", "dueDate", "projectId", "userId"];
      const errors = {};

      required.forEach((field) => {
        if (task[field].trim() == "") {
          errors[field] = "El campo es obligatorio";
        }
      });

      if (Object.keys(errors).length > 0) {
        return { status: 400, errors, ok: false };
      }

      // Verificar si el proyecto existe
      const project = await Project.findById(projectId);
      if (!project) {
        return {
          status: 404,
          error: "Proyecto no encontrado",
        };
      }

      // Crear la tarea
      const newTask = new Task({
        name,
        description,
        dueDate,
        completed,
        projectId,
        userId,
      });

      await newTask.save();

      return {
        status: 200,
        newTask,
      };
    } catch (error) {
      console.error("Error creando tarea:", error);
      return {
        status: 500,
        error: "Error creando la tarea",
      };
    }
  },

  async markAsCompleted(req) {
    const { taskId } = req.params;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      { completed: true },
      { returnOriginal: false } // para que devuelva la nueva data directamente
    );

    if (updatedTask) {
      return { status: 200, updatedTask, ok: true };
    }
  },

  async deleteTask(req) {
    try {
      const taskId = req.params.taskId; // El ID de la tarea viene en los parámetros de la URL
      const task = await Task.findById(taskId);

      if (!task) {
        return {
          status: 404,
          error: "Tarea no encontrada",
        };
      }

      await Task.deleteOne({ _id: taskId });

      return {
        status: 200,
        message: "Tarea eliminada con éxito",
      };
    } catch (error) {
      console.error("Error eliminando tarea:", error);
      return {
        status: 500,
        error: "Error eliminando la tarea",
      };
    }
  },
};

export default tasksService;
