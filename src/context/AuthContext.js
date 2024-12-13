import React, { createContext, useState } from "react";

// Create Authentication Context
export const AuthContext = createContext();

// Authentication Provider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn") || false)
  ); // User state (null if not logged in)

  const login = () => {
    setIsLoggedIn(true); // Save user data on login
    localStorage.setItem("isLoggedIn", true); // Optionally save token
  };

  const logout = () => {
    setIsLoggedIn(false); // Clear user state
    localStorage.setItem("isLoggedIn", false); // Remove token from storage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
