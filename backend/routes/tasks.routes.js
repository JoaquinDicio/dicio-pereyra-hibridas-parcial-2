import { Router } from "express";
import tasksController from "../controllers/tasks.controller.js";

const tasksRouter = Router();

tasksRouter.get("/tasks/:projectId", tasksController.getTasksByProject);

tasksRouter.post("/tasks", tasksController.createTask);

tasksRouter.delete("/tasks/:taskId", tasksController.deleteTask);

tasksRouter.put("/tasks/:taskId", tasksController.markAsCompleted);

export default tasksRouter;
