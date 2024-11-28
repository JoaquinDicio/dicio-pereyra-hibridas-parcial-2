import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authService = {
  async login(req) {
    const { user } = req.body;

    const userExistence = await User.findOne({ email: user.email });

    if (!userExistence) {
      return {
        status: 400,
        error: { email: "El email no pertenece a un usuario" },
        ok: false,
      };
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      userExistence.password
    );

    if (!isPasswordValid) {
      return {
        status: 400,
        error: { password: "La clave es incorrecta" },
        ok: false,
      };
    }

    const token = jwt.sign({ ...userExistence }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return { status: 200, user: { token, userExistence }, ok: true };
  },

  async register(req) {
    const newUser = req.body.user; //debe llegar un objeto user en la solicitud
    const userExistence = await User.findOne({ email: newUser.email });
    const required = ["username", "email", "password"];
    const errors = {};

    //verificamos que vengan todos los capmos obligatorios
    required.forEach((key) => {
      if (!newUser[key].trim()) {
        errors[key] = "Este campo es obligatorio";
      }
    });

    if (Object.keys(errors).length > 0) {
      return { status: 400, error: errors, ok: false };
    }

    //verificamos que no exista el usuario

    if (userExistence) {
      return {
        status: 400,
        error: { email: "Ya existe un usuario con ese email" },
        ok: false,
      };
    }

    newUser["password"] = await bcrypt.hash(newUser.password, 10); // encriptacion de clave

    await User.create(newUser);

    return { status: 200, user: newUser, ok: true };
  },
};

export default authService;
