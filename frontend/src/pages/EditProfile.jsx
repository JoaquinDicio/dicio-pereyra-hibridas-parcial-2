import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import useAxios from "../hooks/useAxios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function EditProfile() {
  const navigate = useNavigate();
  const { errors, posting, axiosPut } = useAxios();
  const { user, setUser } = useContext(AuthContext); // recuperamos los datos del user autenticado

  async function handleSubmit(e, newData) {
    e.preventDefault();

    const response = await axiosPut(
      `http://localhost:8080/api/users/${user._id}`,
      { user: newData }
    );

    if (response?.ok) {
      setUser(response.user); // actualiza el estado global del user
      localStorage.setItem("user", JSON.stringify(response.user)); //se guarda en local storage por si se recarga la pagina
      navigate("/profile/" + user._id);
    }
  }

  return (
    <section className="py-20 px-10">
      <h1 className="text-2xl font-medium mb-10">Editar perfil</h1>
      {user._id ? (
        <UserForm
          oldData={user}
          handleSubmit={handleSubmit}
          posting={posting}
          errors={errors}
        />
      ) : (
        <i>No se encontro el usuario especificado</i>
      )}
    </section>
  );
}
