import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [posting, setPostign] = useState(false);
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  async function login(userCredentials) {
    // para cada solicitud
    setErrors(null);
    setPostign(true);

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        user: userCredentials,
      });

      if (response.status == 200) {
        const { user } = response.data;
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(user.userExistence));
        setUser(user.userExistence);
        Cookies.set("token", user.token, { expires: 1 });
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
      setErrors(e.response.data.error);
    } finally {
      setPostign(false);
    }
  }

  async function register(userCredentials) {
    // para cada solicitud
    setErrors(null);
    setPostign(true);

    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        user: userCredentials,
      });

      if (response.status == 200) {
        const { user } = response.data;
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
      setErrors(e.response.data.error);
    } finally {
      setPostign(false);
    }
  }

  return { login, register, errors, posting };
}
