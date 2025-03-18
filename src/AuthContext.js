import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 🔹 Função de login que salva o usuário e o token no LocalStorage
  const login = (userData) => {
    if (!userData || !userData.token) {
      console.error("Erro: Usuário inválido ao tentar fazer login");
      return;
    }
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate(`/aluno/perfil/${userData.id}`);
  };

  // 🔹 Função de logout
  const logout = useCallback(() => {
    console.log("Realizando logout...");
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  // 🔹 Verifica se há um usuário no LocalStorage ao carregar a aplicação
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser?.token) {
        setUser(parsedUser);
      } else {
        logout(); // Se não houver token válido, faz logout
      }
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
