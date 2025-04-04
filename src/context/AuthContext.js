import axios from "axios";
import React, { createContext, useState } from "react";
import { BASEURL } from "../config/config";
import { useNavigate } from "react-router";

// Create Authentication Context
export const AuthContext = createContext();

// Authentication Provider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn") || false)
  );

  const navigate = useNavigate();

  const [role, setRole] = useState(localStorage.getItem("role") || "user");

  const login = async (username, password, from) => {
    try {
      const response = await axios.post(`${BASEURL}/users/login`, {
        username,
        password
      });
      console.log(response);
      console.log(response.data.error)
      const { token, role } = response.data;

      setIsLoggedIn(true);
      setRole(role);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", false);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};
