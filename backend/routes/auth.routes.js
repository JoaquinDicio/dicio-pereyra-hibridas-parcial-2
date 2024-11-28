import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const authRouter = Router();

authRouter.post("/login", authController.login);

authRouter.post("/verifyToken", verifyToken);

authRouter.post("/register", authController.register);

export default authRouter;
