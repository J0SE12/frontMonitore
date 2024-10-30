import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Cria o contexto de autenticação
const AuthContext = createContext();

// Hook para acessar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};

// Componente para fornecer o contexto de autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Função para realizar o login e armazenar as informações do usuário
  const login = (userData) => {
    setUser(userData);
    // Armazena o usuário no localStorage para persistir a autenticação
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Função para realizar o logout e limpar o estado
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Verifica se há um usuário armazenado no localStorage ao montar o componente
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
