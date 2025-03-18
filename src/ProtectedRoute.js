import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  console.log(`🔒 Protegendo a rota: ${location.pathname}`); // Log para depuração

  if (!user || !user.token) {
    console.warn("🔑 Usuário não autenticado! Redirecionando para login...");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
