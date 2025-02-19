import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Criação do contexto de autenticação
export const AuthContext = createContext();

// Hook para acessar o contexto
export const useAuth = () => useContext(AuthContext);

// Provedor do AuthContext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Função para realizar login
  const login = (userData) => {
    if (!userData || !userData.userId) return;
    
    setUser({
      token: userData.token,
      userId: Number(userData.userId), // 🔥 Converte `userId` para número
    });

    localStorage.setItem("user", JSON.stringify({
      token: userData.token,
      userId: Number(userData.userId),
    }));
  };

  // Função para realizar logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Verifica se há usuário salvo no localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.token && parsedUser.userId) {
        setUser({
          token: parsedUser.token,
          userId: Number(parsedUser.userId), // 🔥 Garante que `userId` seja um número
        });
      } else {
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
