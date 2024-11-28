import { Router } from "express";
import usersController from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/users/:userId/projects", usersController.getUserProjects);

export default usersRouter;
