import { Router } from "express";
import projectsController from "../controllers/projects.controller.js";
import commentsController from "../controllers/comments.controller.js";
import contributorsController from "../controllers/contributors.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const projectsRouter = Router();

projectsRouter.get("/projects", projectsController.getAllProjects);

projectsRouter.get("/projects/:projectID", projectsController.getProjectById);

projectsRouter.post("/projects", verifyToken, projectsController.createProject);

projectsRouter.delete(
  "/projects/:projectID",
  verifyToken,
  projectsController.deleteProject
);

projectsRouter.put(
  "/projects/:projectID",
  verifyToken,
  projectsController.updateProject
);

// COMENTARIOS DE LOS PROYECTOS

projectsRouter.post(
  "/projects/:projectID/comments",
  verifyToken,
  commentsController.createComment
);

projectsRouter.get(
  "/projects/:projectID/comments",
  commentsController.getProjectComments
);

// CONTRIBUIDORES DE LOS PROYECTOS
projectsRouter.post(
  "/projects/:projectID/contributors",
  contributorsController.addContributor
);

projectsRouter.get(
  "/projects/:projectID/contributors",
  verifyToken,
  contributorsController.getProjectContributors
);

projectsRouter.delete(
  "/projects/:projectID/contributors/:contributorID",
  verifyToken,
  contributorsController.deleteContributor
);

export default projectsRouter;
