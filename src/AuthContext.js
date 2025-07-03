// Em AuthContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 👇 FUNÇÃO DE LOGIN CORRIGIDA
  const login = useCallback((userData) => {
    // Validação mais robusta dos dados recebidos
    if (!(userData?.token && userData?.id && userData?.papel)) {
      console.error("Erro: Dados do usuário incompletos ao tentar fazer login");
      return;
    }
    // Salva o objeto completo: { token, id, papel }
    setUser(userData); 
    localStorage.setItem("user", JSON.stringify(userData));
    
    // Redireciona com base no papel do usuário
    if (userData.papel === 'aluno') {
        navigate(`/aluno/perfil/${userData.id}`);
    } else if (userData.papel === 'monitor') {
        // Exemplo de redirecionamento para monitores
        // navigate(`/monitor/dashboard/${userData.id}`); 
    } else {
        // Redirecionamento padrão caso o papel não seja reconhecido
        navigate('/');
    }
  }, [navigate]);

  // Sua função de logout (mantida)
  const logout = useCallback(() => {
    console.log("Realizando logout...");
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  // Seu useEffect para verificar o usuário no carregamento (mantido)
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

  const contextValue = React.useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider> )
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
AuthProvider.displayName = "AuthProvider";