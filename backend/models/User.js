import mongoose from "mongoose";

// Definir el esquema para los usuarios
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "El correo no es válido"], // validacion del formato
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true } // para que guarde la info de cuando fue creado
);

const User = mongoose.model("User", userSchema);

export default User;
