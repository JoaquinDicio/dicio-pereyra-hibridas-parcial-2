import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = Cookies.get("token");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, logout, setUser, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
