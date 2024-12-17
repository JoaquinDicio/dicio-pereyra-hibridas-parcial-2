import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import projectsRouter from "./routes/projects.routes.js";
import usersRouter from "./routes/users.routes.js";
import connectDB from "./db.js";
import categoriesRouter from "./routes/categories.routes.js";
import tasksRouter from "./routes/tasks.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

configDotenv(); // para usar variables de entorno

connectDB();

// ==== Routes ==== //
app.use("/auth", authRouter);

app.use("/api/", projectsRouter);

app.use("/api/", usersRouter);

app.use("/api/", categoriesRouter);

app.use("/api/", tasksRouter);

app.listen(8080, () => console.log("Server running at :", process.env.PORT));
