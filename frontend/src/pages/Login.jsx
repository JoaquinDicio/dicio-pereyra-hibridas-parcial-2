import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Login() {
  const { login, posting, errors } = useAuth();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  function handleChange(target) {
    setUserCredentials((prev) => ({ ...prev, [target.name]: target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await login(userCredentials);
  }

  return (
    <section className="p-10">
      <h1 className="text-2xl">Login</h1>
      <form onSubmit={handleSubmit} className="my-4">
        <div className="flex flex-col gap-2 max-w-[300px]">
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
        </div>
      </form>
      <Link to="/register" className="text-sm text-blue-500">
        ¿No tenés una cuenta?
      </Link>
    </section>
  );
}
