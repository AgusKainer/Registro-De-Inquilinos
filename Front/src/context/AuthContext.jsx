import { createContext, useState, useEffect, useContext } from "react";
import { updateAdminProfile as updateAdminProfileAPI } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session storage on load
    const token = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch(
        "http://localhost:30/alquileres/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

      const data = await response.json();

      // Save data to sessionStorage (clears when tab/browser closes)
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.admin));

      setUser(data.admin);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await updateAdminProfileAPI(profileData);

      // Actualizar el usuario en el contexto y sessionStorage
      const updatedUser = response.admin;
      setUser(updatedUser);
      sessionStorage.setItem("user", JSON.stringify(updatedUser));

      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const value = {
    user,
    login,
    logout,
    updateProfile,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
