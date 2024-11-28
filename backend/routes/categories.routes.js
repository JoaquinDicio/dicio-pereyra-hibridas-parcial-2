import { Router } from "express";
import categoriesController from "../controllers/categories.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
const categoriesRouter = Router();

categoriesRouter.get("/categories", categoriesController.getAllCategories);

categoriesRouter.post(
  "/categories",
  verifyToken,
  categoriesController.createCategory
);

categoriesRouter.delete(
  "/categories/:categoryID",
  verifyToken,
  categoriesController.deleteCategory
);

export default categoriesRouter;
