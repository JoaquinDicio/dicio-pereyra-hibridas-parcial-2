import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const usersRouter = Router();

usersRouter.get("/users/:userId/projects", usersController.getUserProjects);

usersRouter.get("/users/:userId", usersController.getUserData); // se usa el middleware para que traiga la informacion del usuario del token

usersRouter.put("/users/:userId", verifyToken, usersController.updateUserData); // se usa el middleware para que traiga la informacion del usuario del token

usersRouter.get("/users/:userId/tasks", usersController.getTasksByUser);

export default usersRouter;
