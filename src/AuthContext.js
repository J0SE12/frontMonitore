import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Cria o contexto de autenticação
export const AuthContext = createContext();

// Hook para acessar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);

// Provedor do AuthContext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Controle de carregamento inicial
  const navigate = useNavigate();

  // Função para realizar login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Salva no localStorage
  };

  // Função para realizar logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login", { replace: true }); // Redireciona para login
  };

  // Verifica se há usuário no localStorage ao carregar o componente
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const currentTime = Date.now() / 1000; // Tempo atual em segundos
      if (parsedUser.token && parsedUser.exp > currentTime) {
        setUser(parsedUser); // Configura o estado do usuário
      } else {
        localStorage.removeItem("user"); // Remove se expirado
      }
    }
    setLoading(false); // Finaliza o carregamento inicial
  }, []);

  // Redireciona para `/login` somente após confirmar que o usuário não está autenticado
  useEffect(() => {
    if (!loading && !user && window.location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [user, navigate, loading]);

  // Definição do `value` para o AuthContext.Provider
  const value = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Renderiza o conteúdo somente após o carregamento */}
    </AuthContext.Provider>
  );
};
