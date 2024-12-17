import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router-dom";

export default function PrivateHeader() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú hamburguesa
  const { axiosGet } = useAxios();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axiosGet("http://localhost:8080/api/categories");
        if (response.ok) {
          setCategories(response.categories);
        } else {
          console.error("Error al obtener las categorías:", response.message);
        }
      } catch (error) {
        console.error("Error al conectar con la API:", error.message);
      } finally {
        setLoading(false);
      }
    }

    getCategories();
  }, []);

  return (
    <header className="fixed top-0 left-0 bg-slate-200 flex justify-between items-center px-5 py-3 w-full shadow-md z-10">
      <Link to={"/"} className="text-lg font-bold">
        ProjectHub
      </Link>

      <button
        className="lg:hidden flex items-center text-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute lg:static top-16 left-0 lg:top-auto lg:left-auto bg-slate-200 lg:bg-transparent lg:flex flex-col lg:flex-row gap-4 lg:gap-6 w-full lg:w-auto p-4 lg:p-0 shadow-lg lg:shadow-none`}
      >
        <ul className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {loading ? (
            <li className="text-gray-500">Cargando...</li>
          ) : (
            categories.map((category) => (
              <li key={category._id}>
                <Link
                  to={`/?type=${category._id}`}
                  className="text-gray-700 hover:text-blue-600"
                >
                  {category.name}
                </Link>
              </li>
            ))
          )}
        </ul>

        {menuOpen && (
          <div className="flex justify-between gap-3 mt-4 lg:hidden">
            <Link
              to={`/profile/${user._id}`}
              className="text-gray-700 hover:text-blue-600"
            >
              {user?.username}
            </Link>
            <button onClick={logout} className="text-red-500 text-sm">
              Cerrar sesión
            </button>
          </div>
        )}
      </nav>

      <div className=" hidden lg:flex gap-3 items-center">
        <Link
          to={`/profile/${user._id}`}
          className="text-gray-700 hover:text-blue-600"
        >
          {user?.username}
        </Link>
        <button onClick={logout} className="text-red-500 text-sm">
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
