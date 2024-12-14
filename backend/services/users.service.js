import Project from "../models/Project.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const usersService = {
  async getUserData(req) {
    const { userId } = req.params;

    const isValid = mongoose.Types.ObjectId.isValid(userId);

    if (!isValid) {
      // no es un ID valido en el formato de Mongo
      return {
        status: 400,
        errors: { id: "El ID no posee un formato valido" },
        ok: false,
      };
    }

    const formatedId = new mongoose.Types.ObjectId(userId); // tiene que ser de esta forma porque asi se formatean en mongo

    const userData = await User.findOne({ _id: formatedId });

    if (!userData) {
      // no existe el usuario
      return {
        status: 404,
        errors: { id: "No existe usuario con el ID especificado" },
        ok: false,
      };
    }

    // elimina la contraseña para no retornarla porque es dato confidencial
    userData.password = undefined;

    return { status: 200, user: userData, ok: true };
  },

  async updateUserData(req) {
    const { userId } = req.params;
    const { user } = req.body; // los nuevos datos
    const required = ["username", "email"];
    const errors = {};

    required.forEach((field) => {
      if (user[field].trim() == "") {
        errors[field] = "Este campo es obligatorio";
      }
    });

    if (Object.keys(errors).length > 0) {
      return {
        status: 400,
        errors,
        ok: false,
      };
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      // no es un ID valido en el formato de Mongo
      return {
        status: 400,
        errors: { id: "El ID no posee un formato valido" },
        ok: false,
      };
    }

    // si el email fue cambiado verificamos que no este en uso por otra cuenta
    const emailExistence = await User.findOne({ email: user.email });

    const { _id } = req.user._doc; // extrae el ID que vino del token

    if (emailExistence && _id !== emailExistence._doc._id.toString()) {
      return {
        status: 400,
        errors: { email: "El email se encuentra en uso" },
        ok: false,
      };
    }

    const existence = await User.findByIdAndUpdate(userId, user); // aca se produce la actualizacion

    if (!existence) {
      // si no encuentra un usuario el metodo retorna null y se activa ese if
      return {
        status: 404,
        errors: { id: "El ID ingresado no pertenece a un usuario" },
        ok: false,
      };
    }

    // si todo se valido correctamente llegamos a este return
    return { status: 200, user: { ...existence._doc, ...user }, ok: true };
  },

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
