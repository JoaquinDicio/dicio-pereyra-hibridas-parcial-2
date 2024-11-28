import Project from "../models/Project.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const usersService = {
  async getUserProjects(req) {
    const { userId } = req.params;

    const formatedId = new mongoose.Types.ObjectId(userId); // tiene que ser de esta forma porque asi se formatean en mongo

    const userExistence = await User.findOne({ _id: formatedId });

    if (!userExistence) {
      return {
        status: 404,
        error: "El usuario especificado no existe",
        ok: false,
      };
    }

    const projects = await Project.find({ userId });

    return { status: 200, projects, owner: userExistence };
  },
};

export default usersService;
