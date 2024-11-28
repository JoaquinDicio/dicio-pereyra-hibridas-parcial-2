import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const { register, posting, errors } = useAuth();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    username: "",
  });

  function handleChange(target) {
    setUserCredentials((prev) => ({ ...prev, [target.name]: target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await register(userCredentials);
  }

  return (
    <section className="p-10">
      <h1 className="text-2xl">Registrarse</h1>
      <form onSubmit={handleSubmit} className="my-4">
        <div className="flex flex-col gap-2 max-w-[300px]">
          <input
            className="border border-1 border-black p-1"
            value={userCredentials.name}
            onChange={(e) => handleChange(e.target)}
            type="text"
            placeholder="Nombre"
            name="username"
            required
          />
          <i className="text-red-500 text-sm">{errors?.username}</i>
          <input
            className="border border-1 border-black p-1"
            value={userCredentials.email}
            onChange={(e) => handleChange(e.target)}
            type="text"
            placeholder="Email"
            name="email"
            required
          />
          <i className="text-red-500 text-sm">{errors?.email}</i>
          <input
            className="border border-1 border-black p-1"
            value={userCredentials.password}
            onChange={(e) => handleChange(e.target)}
            type="password"
            name="password"
            placeholder="Clave"
            required
          />
          <i className="text-red-500 text-sm">{errors?.password}</i>

          <input
            value="Entrar"
            type="submit"
            className="disabled:bg-slate-200 bg-blue-500 cursor-pointer hover:bg-blue-700 duration-75 text-white rounded-sm px-3 py-1"
            disabled={posting}
          />
          <i className="text-red-500 text-sm">{errors?.error}</i>
        </div>
      </form>
    </section>
  );
}
